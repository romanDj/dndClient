package main

//входной файл сервера

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	"github.com/romanDj/dndClient/common"
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

	//при любом запросе отдавать либо index.html либо файл ресурсов
	e.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./client/build/index.html")
		} else {
			// strings.Split(file, "?")
			c.File("./client/build/" + path.Join(dir, file))
		}
	})
	return e
}
