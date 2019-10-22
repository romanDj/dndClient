//работа с бд
package common

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "os"
)

type Database struct {
	*gorm.DB
}

var DB *gorm.DB

//инициализация базы данных
func Init() *gorm.DB {
	db, err := gorm.Open("sqlite3", "./../dnd.db")
	if err != nil {
		fmt.Println("db err: ", err)
	}
	//максимальное количество подключений
	db.DB().SetMaxIdleConns(50)
	DB = db
	return DB
}

//получение экземпляра бд
func GetDB() *gorm.DB {
	return DB
}