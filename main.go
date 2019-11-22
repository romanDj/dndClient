package main

//входной файл сервера
import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	"github.com/romanDj/dndClient/common"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/sync/errgroup"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"time"
)

//экземпляр приложения
var app struct {
	server *http.Server
}

//глобальные переменные
var (
	g errgroup.Group
)

func main() {
	//инициализация бд
	db := common.Init()
	//закрытие подключения
	defer db.Close()
	fmt.Println("Hello!")
	initRouting()
}

//инициализация запускаемых сервисов
func initRouting() {
	var port string
	//выбор порта
	if os.Getenv("PORT") == "" {
		port = "8000"
	} else {
		port = os.Getenv("PORT")
	}

	fmt.Println("Used port : " + port)

	//задать глобальный экземпляр сервера
	app.server = &http.Server{
		Addr:         ":" + port,
		Handler:      routerHandler(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	//запуск подпрограммы
	g.Go(func() error {
		return app.server.ListenAndServe()
	})

	//ожидание
	if err := g.Wait(); err != nil {
		log.Fatal(err)
	}
}

func GetClient() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://heroku_cv76dqrz:c0605jtuo7ldji5v657mt290ls@ds053597.mlab.com:53597/heroku_cv76dqrz")
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	return client
}

type User struct {
	Id     string `bson:"_id" json:"id"`
	Name   string `json:"name"`
	Login  string `json:"login"`
	Password string   `json:"password"`
	Role string   `json:"role"`
}

func ReturnAllUsers(client *mongo.Client, filter bson.M) []*User {
	var users []*User
	collection := client.Database("dnd").Collection("users")
	cur, err := collection.Find(context.TODO(), filter)
	if err != nil {
		log.Fatal("Error on Finding all the documents", err)
	}
	for cur.Next(context.TODO()) {
		var user User
		err = cur.Decode(&user)
		if err != nil {
			log.Fatal("Error on Decoding the document", err)
		}
		users = append(users, &user)
	}
	return users
}

//callback c роутерами
func routerHandler() http.Handler {
	e := gin.Default()
	e.Use(gin.Recovery())

	//rest service
	//здесь нужно будет настроить дочерние роуты
	e.GET("/api", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"code":  http.StatusOK,
				"error": "Welcome Rest API!",
			},
		)
	})

	//запрос к mongoDb
	e.GET("/mongo", func(c *gin.Context) {
		users := ReturnAllUsers(GetClient(), bson.M{})
		c.JSON(
			http.StatusOK,
			users,
		)
	})

	//при любом запросе отдавать либо index.html либо файл ресурсов
	e.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./client/dist/index.html")
		} else {
			// strings.Split(file, "?")
			c.File("./client/dist/" + path.Join(dir, file))
		}
	})
	return e
}
