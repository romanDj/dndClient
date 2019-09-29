package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	"golang.org/x/sync/errgroup"
	"log"
	"net/http"
	"path"
	"path/filepath"
	"time"
)

//экземпляр приложения
var app struct {
	backServer  *http.Server
	frontServer *http.Server
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
	app.frontServer = &http.Server{
		Addr:         ":3000",
		Handler:      routerFrontend(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	app.backServer = &http.Server{
		Addr:         ":5555",
		Handler:      routerBackend(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	//запуск подпрограммы
	g.Go(func() error {
		return app.backServer.ListenAndServe()
	})
	g.Go(func() error {
		return app.frontServer.ListenAndServe()
	})

	//ожидание
	if err := g.Wait(); err != nil {
		log.Fatal(err)
	}
}

//отдает статическую страницу
func routerFrontend() http.Handler {
	e := gin.Default()
	e.Use(gin.Recovery())
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

//rest сервисы
func routerBackend() http.Handler {
	e := gin.Default()
	e.Use(gin.Recovery())
	e.GET("/", func(c *gin.Context) {
		c.JSON(
			http.StatusOK,
			gin.H{
				"code":  http.StatusOK,
				"error": "Welcome Rest API!",
			},
		)
	})
	return e
}
