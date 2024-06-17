---
title: SOLID
sidebar_position: 1
---

## S - Принцип единственной ответственности (Single Responsibility Principle)

Каждый класс или модуль должен иметь одну и только одну причину для изменения. То есть, он должен решать только одну задачу.

```go title="Плохой пример"
type User struct {
    Name string
    Email string
}

func (u *User) Save() {
    // сохраняет пользователя в базу данных
}

func (u *User) SendEmail() {
    // отправляет email пользователю
}
```

```go title="Хороший пример"
type User struct {
    Name  string
    Email string
}

type UserRepository struct {}

func (r *UserRepository) Save(u User) {
    // сохраняет пользователя в базу данных
}

type EmailService struct {}

func (e *EmailService) SendEmail(u User) {
    // отправляет email пользователю
}
```

## O - Принцип открытости/закрытости (Open/Closed Principle)

Программные сущности должны быть открыты для расширения, но закрыты для модификации.

```go title="Плохой пример"
// добавление новых форм требует изменения существующего кода.
type Shape struct {}

func (s *Shape) Area(shapeType string, dimensions ...float64) float64 {
    if shapeType == "circle" {
        return 3.14 * dimensions[0] * dimensions[0]
    } else if shapeType == "rectangle" {
        return dimensions[0] * dimensions[1]
    }
    return 0
}
```

```go title="Хороший пример"
// использование интерфейсов для расширения.
type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
```

## L - Принцип подстановки Барбары Лисков (Liskov Substitution Principle)

Наследующие классы должны дополнять, а не изменять функциональность базовых классов. То есть, если S является подтипом T, объекты типа T могут быть заменены объектами типа S без изменения желаемых свойств программы.

```go title="Плохой пример"
// наследующий класс изменяет поведение базового класса.
type Bird struct {}

func (b Bird) Fly() string {
    return "I can fly"
}

type Ostrich struct {
    Bird
}

func (o Ostrich) Fly() string {
    return "I can't fly"
}
```

```go title="Хороший пример"
// интерфейсы для различных типов поведения.
type Flyer interface {
    Fly() string
}

type Sparrow struct {}

func (s Sparrow) Fly() string {
    return "I can fly"
}

type Ostrich struct {}

func (o Ostrich) Run() string {
    return "I can run fast"
}
```

## I - Принцип разделения интерфейса (Interface Segregation Principle)

Клиенты не должны зависеть от интерфейсов, которые они не используют. То есть, лучше иметь несколько специализированных интерфейсов, чем один общий.

```go title="Плохой пример"
// один интерфейс с методами, которые не используются всеми реализациями.
type Worker interface {
    Work()
    Eat()
}

type Human struct {}

func (h Human) Work() {
    // человек работает
}

func (h Human) Eat() {
    // человек ест
}

type Robot struct {}

func (r Robot) Work() {
    // робот работает
}

func (r Robot) Eat() {
    // робот не ест
}
```

```go title="Хороший пример"
// разделение интерфейсов.
type Worker interface {
    Work()
}

type Eater interface {
    Eat()
}

type Human struct {}

func (h Human) Work() {
    // человек работает
}

func (h Human) Eat() {
    // человек ест
}

type Robot struct {}

func (r Robot) Work() {
    // робот работает
}
```

## D - Принцип инверсии зависимостей (Dependency Inversion Principle)

Модули верхнего уровня не должны зависеть от модулей нижнего уровня. Оба должны зависеть от абстракций. Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.

```go title="Плохой пример"
// высокоуровневый модуль зависит от низкоуровневого.
type LightBulb struct {}

func (lb LightBulb) TurnOn() {
    // включить лампочку
}

func (lb LightBulb) TurnOff() {
    // выключить лампочку
}

type Switch struct {
    Bulb LightBulb
}

func (s Switch) Operate() {
    s.Bulb.TurnOn()
}
```

```go title="Хороший пример"
// высокоуровневый модуль зависит от абстракции.
type Switchable interface {
    TurnOn()
    TurnOff()
}

type LightBulb struct {}

func (lb LightBulb) TurnOn() {
    // включить лампочку
}

func (lb LightBulb) TurnOff() {
    // выключить лампочку
}

type Switch struct {
    Device Switchable
}

func (s Switch) Operate() {
    s.Device.TurnOn()
}
```
