package common
//общие функции для выдачи ошибок и валидации
import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"gopkg.in/go-playground/validator.v8"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

//вспомогательная функция для генерации строки
func RandString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

//private config
const NBSecretPassword = "A String Very Very Very Strong!!@##$!@#$"
const NBRandomPassword = "A String Very Very Very Niubilty!!@##$!@#4"

//генерация токена для использования в заголовках
func GenToken(id uint) string {
	jwt_token := jwt.New(jwt.GetSigningMethod("HS256"))
	//соль
	jwt_token.Claims = jwt.MapClaims{
		"id":  id,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}
	//токен в виде строки
	token, _ := jwt_token.SignedString([]byte(NBSecretPassword))
	return token
}


//собственная структура для возврата ошибок
type OwnError struct {
	Errors map[string]interface{} `json:"errors"`
}

//обратчик ошибки возвращаемый Bind
func NewValidatorError(err error) OwnError {
	res := OwnError{}
	res.Errors = make(map[string]interface{})
	errs := err.(validator.ValidationErrors)
	for _, v := range errs {
		//перевод ошибки по одному
		if v.Param != "" {
			res.Errors[v.Field] = fmt.Sprintf("{%v: %v}", v.Tag, v.Param)
		} else {
			res.Errors[v.Field] = fmt.Sprintf("{key: %v}", v.Tag)
		}
	}
	return res
}

//деформация ошибки
func NewError(key string, err error) OwnError {
	res := OwnError{}
	res.Errors = make(map[string]interface{})
	res.Errors[key] = err.Error()
	return res
}

//Bind для валидации данных из запроса
func Bind(c *gin.Context, obj interface{}) error {
	b := binding.Default(c.Request.Method, c.ContentType())
	return c.ShouldBindWith(obj, b)
}