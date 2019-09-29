package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
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
	fmt.Println("Hello!")
	initRouting()
}

//инициализация запускаемых сервисов
func initRouting() {
	var port string
	if os.Getenv("PORT") == "" {
		port = ":3000"
	} else {
		port = os.Getenv("PORT")
	}

	fmt.Println("/n Used port : " + port)

	app.server = &http.Server{
		Addr:         port,
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

//отдает статическую страницу
func routerHandler() http.Handler {
	e := gin.Default()
	e.Use(gin.Recovery())

	e.GET("/api", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"code":  http.StatusOK,
				"error": "Welcome Rest API!",
			},
		)
	})

	//при любом запросе отдавать либо index.html либо файл
	e.NoRoute(func(c *gin.Context) {
		dir, file := path.Split(c.Request.RequestURI)
		ext := filepath.Ext(file)
		if file == "" || ext == "" {
			c.File("./client/index.html")
		} else {
			// strings.Split(file, "?")
			c.File("./client" + path.Join(dir, file))
		}
	})

	return e
}
