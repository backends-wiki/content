---
title: Банда 4 / Gang of 4
sidebar_position: 2
---

Паттерны проектирования из книги "Design Patterns: Elements of Reusable Object-Oriented Software" авторов Эриха Гаммы, Ричарда Хелма, Ральфа Джонсона и Джона Влиссидеса (Gang of Four) можно классифицировать на три основных категории: порождающие, структурные и поведенческие.

## Порождающие паттерны

### 1. Singleton

Описание: Паттерн Singleton гарантирует, что у класса есть только один экземпляр, и предоставляет глобальную точку доступа к этому экземпляру.

Когда использовать:

- Когда нужно гарантировать, что у класса есть только один экземпляр.
- Когда требуется предоставить глобальную точку доступа к этому экземпляру.

```go
package main

import (
    "fmt"
    "sync"
)

type singleton struct{}

var instance *singleton
var once sync.Once

func GetInstance() *singleton {
    once.Do(func() {
        instance = &singleton{}
    })
    return instance
}

func main() {
    s1 := GetInstance()
    s2 := GetInstance()
    fmt.Println(s1 == s2) // true
}
```

### 2. Factory Method (Фабричный метод)

Описание: Паттерн Factory Method определяет интерфейс для создания объекта, но позволяет подклассам изменить тип создаваемого объекта.

Когда использовать:

- Когда нужно делегировать создание объектов подклассам.
- Когда нужно избежать жесткой привязки классов к конкретным типам создаваемых объектов.

```go
package main

import "fmt"

// Product интерфейс
type Product interface {
    Use() string
}

// ConcreteProductA реализация Product
type ConcreteProductA struct {}

func (p *ConcreteProductA) Use() string {
    return "ProductA"
}

// ConcreteProductB реализация Product
type ConcreteProductB struct {}

func (p *ConcreteProductB) Use() string {
    return "ProductB"
}

// Factory функция
func Factory(productType string) Product {
    switch productType {
    case "A":
        return &ConcreteProductA{}
    case "B":
        return &ConcreteProductB{}
    default:
        return nil
    }
}

func main() {
    productA := Factory("A")
    productB := Factory("B")
    fmt.Println(productA.Use()) // "ProductA"
    fmt.Println(productB.Use()) // "ProductB"
}
```

### 3. Abstract Factory (Абстрактная Фабрика)

Описание: Паттерн Abstract Factory предоставляет интерфейс для создания семейств взаимосвязанных или взаимозависимых объектов без указания их конкретных классов.

Когда использовать:

- Когда нужно создавать семейства связанных объектов.
- Когда требуется обеспечить совместимость создаваемых объектов.

```go
package abstractfactory

import "fmt"

// AbstractProductA - интерфейс продукта A
type AbstractProductA interface {
    UseA() string
}

// AbstractProductB - интерфейс продукта B
type AbstractProductB interface {
    UseB() string
}

// ConcreteProductA1 - конкретный продукт A1
type ConcreteProductA1 struct{}

func (p *ConcreteProductA1) UseA() string {
    return "Product A1"
}

// ConcreteProductA2 - конкретный продукт A2
type ConcreteProductA2 struct{}

func (p *ConcreteProductA2) UseA() string {
    return "Product A2"
}

// ConcreteProductB1 - конкретный продукт B1
type ConcreteProductB1 struct{}

func (p *ConcreteProductB1) UseB() string {
    return "Product B1"
}

// ConcreteProductB2 - конкретный продукт B2
type ConcreteProductB2 struct{}

func (p *ConcreteProductB2) UseB() string {
    return "Product B2"
}

// AbstractFactory - интерфейс фабрики
type AbstractFactory interface {
    CreateProductA() AbstractProductA
    CreateProductB() AbstractProductB
}

// ConcreteFactory1 - конкретная фабрика 1
type ConcreteFactory1 struct{}

func (f *ConcreteFactory1) CreateProductA() AbstractProductA {
    return &ConcreteProductA1{}
}

func (f *ConcreteFactory1) CreateProductB() AbstractProductB {
    return &ConcreteProductB1{}
}

// ConcreteFactory2 - конкретная фабрика 2
type ConcreteFactory2 struct{}

func (f *ConcreteFactory2) CreateProductA() AbstractProductA {
    return &ConcreteProductA2{}
}

func (f *ConcreteFactory2) CreateProductB() AbstractProductB {
    return &ConcreteProductB2{}
}

func main() {
    var factory AbstractFactory
    factory = &ConcreteFactory1{}
    productA := factory.CreateProductA()
    productB := factory.CreateProductB()
    fmt.Println(productA.UseA())
    fmt.Println(productB.UseB())

    factory = &ConcreteFactory2{}
    productA = factory.CreateProductA()
    productB = factory.CreateProductB()
    fmt.Println(productA.UseA())
    fmt.Println(productB.UseB())
}
```

### 4. Builder (Строитель)

Описание: Паттерн Builder отделяет конструирование сложного объекта от его представления, так что в результате одного и того же процесса конструирования могут получаться разные представления.

Когда использовать:

- Когда нужно создавать сложные объекты пошагово.
- Когда нужно создавать различные представления объекта с использованием одного и того же процесса создания.

```go
package builder

import "fmt"

// Product - продукт, который будет создан
type Product struct {
    partA string
    partB string
    partC string
}

// Builder - интерфейс строителя
type Builder interface {
    SetPartA()
    SetPartB()
    SetPartC()
    GetResult() Product
}

// ConcreteBuilder - конкретный строитель
type ConcreteBuilder struct {
    product Product
}

func (b *ConcreteBuilder) SetPartA() {
    b.product.partA = "PartA"
}

func (b *ConcreteBuilder) SetPartB() {
    b.product.partB = "PartB"
}

func (b *ConcreteBuilder) SetPartC() {
    b.product.partC = "PartC"
}

func (b *ConcreteBuilder) GetResult() Product {
    return b.product
}

// Director - директор, управляющий строителем
type Director struct {
    builder Builder
}

func (d *Director) Construct() {
    d.builder.SetPartA()
    d.builder.SetPartB()
    d.builder.SetPartC()
}

func main() {
    builder := &ConcreteBuilder{}
    director := &Director{builder: builder}
    director.Construct()
    product := builder.GetResult()
    fmt.Printf("Product: %+v\n", product)
}
```

### 5. Prototype (Прототип)

Описание: Паттерн Prototype позволяет создавать новые объекты путем копирования существующих объектов (прототипов) вместо создания новых экземпляров.

Когда использовать:

- Когда нужно создавать объекты на основе других объектов, избегая их повторного создания.
- Когда стоимость создания нового объекта велика.

```go
package prototype

import "fmt"

// Prototype - интерфейс прототипа
type Prototype interface {
    Clone() Prototype
}

// ConcretePrototype1 - конкретный прототип 1
type ConcretePrototype1 struct {
    Field1 string
}

func (p *ConcretePrototype1) Clone() Prototype {
    return &ConcretePrototype1{Field1: p.Field1}
}

// ConcretePrototype2 - конкретный прототип 2
type ConcretePrototype2 struct {
    Field2 int
}

func (p *ConcretePrototype2) Clone() Prototype {
    return &ConcretePrototype2{Field2: p.Field2}
}

func main() {
    prototype1 := &ConcretePrototype1{Field1: "Value1"}
    clone1 := prototype1.Clone()
    fmt.Printf("Prototype1: %+v, Clone1: %+v\n", prototype1, clone1)

    prototype2 := &ConcretePrototype2{Field2: 10}
    clone2 := prototype2.Clone()
    fmt.Printf("Prototype2: %+v, Clone2: %+v\n", prototype2, clone2)
}
```

## Структурные паттерны

### 1. Adapter (Адаптер)

Описание: Паттерн Adapter позволяет объектам с несовместимыми интерфейсами работать вместе. Он переводит интерфейс одного класса в интерфейс, который ожидает клиент.

Когда использовать:

- Когда нужно использовать существующий класс, но его интерфейс не соответствует потребностям.
- Когда нужно создать класс, который работает с классами, имеющими несовместимые интерфейсы.

```go
package adapter

import "fmt"

// Target - целевой интерфейс
type Target interface {
    Request() string
}

// Adaptee - адаптируемый класс
type Adaptee struct{}

func (a *Adaptee) SpecificRequest() string {
    return "Specific request"
}

// Adapter - адаптер, который делает интерфейс Adaptee совместимым с Target
type Adapter struct {
    adaptee *Adaptee
}

func (a *Adapter) Request() string {
    return a.adaptee.SpecificRequest()
}

func main() {
    adaptee := &Adaptee{}
    adapter := &Adapter{adaptee: adaptee}
    fmt.Println(adapter.Request())
}
```

### 2. Bridge (Мост)

Описание: Паттерн Bridge разделяет абстракцию и её реализацию так, чтобы они могли изменяться независимо друг от друга. Это достигается путем введения дополнительного уровня косвенности.

Когда использовать:

- Когда нужно избежать постоянной связи между абстракцией и её реализацией.
- Когда изменения в реализации не должны затрагивать клиентский код, который работает с абстракцией.

```go
package bridge

import "fmt"

// Implementor - интерфейс реализации
type Implementor interface {
    OperationImpl() string
}

// ConcreteImplementorA - конкретная реализация A
type ConcreteImplementorA struct{}

func (a *ConcreteImplementorA) OperationImpl() string {
    return "ConcreteImplementorA"
}

// ConcreteImplementorB - конкретная реализация B
type ConcreteImplementorB struct{}

func (b *ConcreteImplementorB) OperationImpl() string {
    return "ConcreteImplementorB"
}

// Abstraction - абстракция
type Abstraction struct {
    implementor Implementor
}

func (a *Abstraction) Operation() string {
    return a.implementor.OperationImpl()
}

func main() {
    var implementor Implementor

    implementor = &ConcreteImplementorA{}
    abstraction := &Abstraction{implementor: implementor}
    fmt.Println(abstraction.Operation())

    implementor = &ConcreteImplementorB{}
    abstraction = &Abstraction{implementor: implementor}
    fmt.Println(abstraction.Operation())
}
```

### 3. Composite (Компоновщик)

Описание: Паттерн Composite позволяет клиентам обрабатывать отдельные объекты и композиции объектов единообразно. Он объединяет объекты в древовидные структуры для представления иерархий часть-целое.

Когда использовать:

- Когда нужно представлять древовидные структуры объектов.
- Когда нужно, чтобы клиенты могли одинаково работать как с отдельными объектами, так и с их композициями.

```go
package composite

import "fmt"

// Component - интерфейс компонента
type Component interface {
    Operation() string
}

// Leaf - лист, не имеющий детей
type Leaf struct {
    name string
}

func (l *Leaf) Operation() string {
    return l.name
}

// Composite - композит, содержащий компоненты
type Composite struct {
    children []Component
}

func (c *Composite) Add(child Component) {
    c.children = append(c.children, child)
}

func (c *Composite) Operation() string {
    result := "Composite: ["
    for _, child := range c.children {
        result += child.Operation() + " "
    }
    result += "]"
    return result
}

func main() {
    leaf1 := &Leaf{name: "Leaf1"}
    leaf2 := &Leaf{name: "Leaf2"}
    composite := &Composite{}
    composite.Add(leaf1)
    composite.Add(leaf2)
    fmt.Println(composite.Operation())
}
```

### 4. Decorator (Декоратор)

Описание: Паттерн Decorator динамически добавляет объектам новые обязанности. Он предоставляет гибкую альтернативу наследованию для расширения функциональности.

Когда использовать:

- Когда нужно добавлять обязанности объектам динамически и прозрачно для них.
- Когда невозможно расширить функциональность с помощью наследования.

```go
package decorator

import "fmt"

// Component - интерфейс компонента
type Component interface {
    Operation() string
}

// ConcreteComponent - конкретный компонент
type ConcreteComponent struct{}

func (c *ConcreteComponent) Operation() string {
    return "ConcreteComponent"
}

// Decorator - декоратор, который содержит компонент
type Decorator struct {
    component Component
}

func (d *Decorator) Operation() string {
    return d.component.Operation()
}

// ConcreteDecoratorA - конкретный декоратор A
type ConcreteDecoratorA struct {
    Decorator
}

func (d *ConcreteDecoratorA) Operation() string {
    return "ConcreteDecoratorA(" + d.component.Operation() + ")"
}

// ConcreteDecoratorB - конкретный декоратор B
type ConcreteDecoratorB struct {
    Decorator
}

func (d *ConcreteDecoratorB) Operation() string {
    return "ConcreteDecoratorB(" + d.component.Operation() + ")"
}

func main() {
    component := &ConcreteComponent{}
    decoratorA := &ConcreteDecoratorA{Decorator{component: component}}
    decoratorB := &ConcreteDecoratorB{Decorator{component: decoratorA}}
    fmt.Println(decoratorB.Operation())
}
```

### 5. Facade (Фасад)

Описание: Паттерн Facade предоставляет единый интерфейс к множеству интерфейсов в подсистеме, упрощая их использование и уменьшая сложность взаимодействия с ними.

Когда использовать:

- Когда нужно упростить работу с сложной системой или библиотекой.
- Когда нужно предоставить упрощённый интерфейс к сложной подсистеме.

```go
package facade

import "fmt"

// Subsystem1 - подсистема 1
type Subsystem1 struct{}

func (s *Subsystem1) Operation1() string {
    return "Subsystem1: Operation1"
}

// Subsystem2 - подсистема 2
type Subsystem2 struct{}

func (s *Subsystem2) Operation2() string {
    return "Subsystem2: Operation2"
}

// Facade - фасад, упрощающий доступ к подсистемам
type Facade struct {
    subsystem1 *Subsystem1
    subsystem2 *Subsystem2
}

func (f *Facade) Operation() string {
    result := "Facade initializes subsystems:\n"
    result += f.subsystem1.Operation1() + "\n"
    result += f.subsystem2.Operation2() + "\n"
    return result
}

func main() {
    subsystem1 := &Subsystem1{}
    subsystem2 := &Subsystem2{}
    facade := &Facade{subsystem1: subsystem1, subsystem2: subsystem2}
    fmt.Println(facade.Operation())
}
```

### 6. Flyweight (Приспособленец)

Описание: Паттерн Flyweight уменьшает количество создаваемых объектов, разделяя их общий внутренний состояния между несколькими объектами. Это помогает существенно экономить память.

Когда использовать:

- Когда приложение использует большое количество однотипных объектов.
- Когда необходимо уменьшить затраты на память за счёт разделения общего состояния между объектами.

```go
package flyweight

import "fmt"

// Flyweight - интерфейс приспособленца
type Flyweight interface {
    Operation(extrinsicState string) string
}

// ConcreteFlyweight - конкретный приспособленец
type ConcreteFlyweight struct {
    intrinsicState string
}

func (f *ConcreteFlyweight) Operation(extrinsicState string) string {
    return fmt.Sprintf("ConcreteFlyweight: Intrinsic[%s], Extrinsic[%s]", f.intrinsicState, extrinsicState)
}

// FlyweightFactory - фабрика приспособленцев
type FlyweightFactory struct {
    flyweights map[string]Flyweight
}

func NewFlyweightFactory() *FlyweightFactory {
    return &FlyweightFactory{flyweights: make(map[string]Flyweight)}
}

func (f *FlyweightFactory) GetFlyweight(key string) Flyweight {
    if flyweight, exists := f.flyweights[key]; exists {
        return flyweight
    }
    flyweight := &ConcreteFlyweight{intrinsicState: key}
    f.flyweights[key] = flyweight
    return flyweight
}

func main() {
    factory := NewFlyweightFactory()
    flyweight1 := factory.GetFlyweight("State1")
    flyweight2 := factory.GetFlyweight("State1")

    fmt.Println(flyweight1.Operation("Extrinsic1"))
    fmt.Println(flyweight2.Operation("Extrinsic2"))
}
```

### 7. Proxy (Заместитель)

Описание: Паттерн Proxy предоставляет суррогат или заместителя другого объекта для контроля доступа к нему. Он может использоваться для различных целей, таких как контроль доступа, ленивое создание объектов и т.д.

Когда использовать:

- Когда нужен более функциональный или контролируемый доступ к объекту.
- Когда требуется ленивое создание объектов или выполнение дополнительных действий при доступе к объекту.

```go
package proxy

import "fmt"

// Subject - интерфейс субъекта
type Subject interface {
    Request() string
}

// RealSubject - реальный субъект
type RealSubject struct{}

func (r *RealSubject) Request() string {
    return "RealSubject: Handling request."
}

// Proxy - заместитель, который контролирует доступ к RealSubject
type Proxy struct {
    realSubject *RealSubject
}

func (p *Proxy) Request() string {
    if p.realSubject == nil {
        p.realSubject = &RealSubject{}
    }
    return "Proxy: Logging request. \n" + p.realSubject.Request()
}

func main() {
    proxy := &Proxy{}
    fmt.Println(proxy.Request())
}
```

## Поведенческие паттерны

### 1. Chain of Responsibility (Цепочка обязанностей)

Описание: Цепочка обязанностей позволяет передавать запрос последовательно по цепочке обработчиков. Каждый обработчик решает, должен ли он обработать запрос или передать его следующему обработчику в цепочке.

Когда использовать:

- Когда нужно избежать жесткой привязки отправителя запроса к его получателю, позволяя нескольким объектам обрабатывать запрос.
- Когда важно возможность динамически менять цепочку обработчиков.

```go
package chainofresponsibility

import "fmt"

// Handler - интерфейс обработчика
type Handler interface {
    SetNext(handler Handler)
    Handle(request string)
}

// BaseHandler - базовый обработчик
type BaseHandler struct {
    next Handler
}

func (h *BaseHandler) SetNext(handler Handler) {
    h.next = handler
}

func (h *BaseHandler) Handle(request string) {
    if h.next != nil {
        h.next.Handle(request)
    }
}

// ConcreteHandler1 - конкретный обработчик 1
type ConcreteHandler1 struct {
    BaseHandler
}

func (h *ConcreteHandler1) Handle(request string) {
    if request == "request1" {
        fmt.Println("ConcreteHandler1 handled request1")
    } else {
        h.BaseHandler.Handle(request)
    }
}

// ConcreteHandler2 - конкретный обработчик 2
type ConcreteHandler2 struct {
    BaseHandler
}

func (h *ConcreteHandler2) Handle(request string) {
    if request == "request2" {
        fmt.Println("ConcreteHandler2 handled request2")
    } else {
        h.BaseHandler.Handle(request)
    }
}

func main() {
    handler1 := &ConcreteHandler1{}
    handler2 := &ConcreteHandler2{}
    handler1.SetNext(handler2)

    handler1.Handle("request1")
    handler1.Handle("request2")
    handler1.Handle("unknown request")
}
```

### 2. Command (Команда)

Описание: Паттерн Команда инкапсулирует запрос в виде объекта, позволяя параметризовать клиентов с разными запросами, ставить запросы в очередь или логировать их. Также поддерживается отмена операций.

Когда использовать:

- Когда нужно параметризовать объекты выполняемым действием.
- Когда нужно ставить операции в очередь, выполнять их в разное время или поддерживать механизм отмены операций.

```go
package command

import "fmt"

// Command - интерфейс команды
type Command interface {
    Execute()
}

// Receiver - получатель команды
type Receiver struct{}

func (r *Receiver) Action() {
    fmt.Println("Receiver: Executing action")
}

// ConcreteCommand - конкретная команда
type ConcreteCommand struct {
    receiver *Receiver
}

func (c *ConcreteCommand) Execute() {
    c.receiver.Action()
}

// Invoker - инициатор команды
type Invoker struct {
    command Command
}

func (i *Invoker) SetCommand(command Command) {
    i.command = command
}

func (i *Invoker) ExecuteCommand() {
    i.command.Execute()
}

func main() {
    receiver := &Receiver{}
    command := &ConcreteCommand{receiver: receiver}
    invoker := &Invoker{}
    invoker.SetCommand(command)
    invoker.ExecuteCommand()
}
```

### 3. Interpreter (Интерпретатор)

Описание: Интерпретатор определяет грамматику языка и интерпретирует предложения на этом языке. Этот паттерн часто используется при разработке компиляторов и парсеров.

Когда использовать:

- Когда у вас есть язык, который нужно интерпретировать, и вы можете выразить его грамматику в виде иерархии классов.
- Когда грамматика достаточно простая и изменения в ней редки.

```go
package interpreter

import "fmt"

// Context - контекст, в котором интерпретируются выражения
type Context struct {
    input  string
    output int
}

// Expression - интерфейс выражения
type Expression interface {
    Interpret(ctx *Context)
}

// NumberExpression - числовое выражение
type NumberExpression struct {
    number int
}

func (e *NumberExpression) Interpret(ctx *Context) {
    ctx.output = e.number
}

// AddExpression - выражение сложения
type AddExpression struct {
    left  Expression
    right Expression
}

func (e *AddExpression) Interpret(ctx *Context) {
    e.left.Interpret(ctx)
    leftResult := ctx.output
    e.right.Interpret(ctx)
    rightResult := ctx.output
    ctx.output = leftResult + rightResult
}

func main() {
    context := &Context{}

    // Интерпретируем выражение 1 + 2
    expression := &AddExpression{
        left:  &NumberExpression{number: 1},
        right: &NumberExpression{number: 2},
    }
    expression.Interpret(context)
    fmt.Println("Result:", context.output) // Output: Result: 3
}
```

### 4. Iterator (Итератор)

Описание: Итератор предоставляет способ последовательного доступа к элементам агрегированного объекта без раскрытия его внутреннего представления.

Когда использовать:

- Когда нужно обеспечить доступ к содержимому объекта без раскрытия его внутреннего представления.
- Когда нужно предоставить несколько вариантов обхода структуры данных.

```go
package iterator

import "fmt"

// Iterator - интерфейс итератора
type Iterator interface {
    HasNext() bool
    Next() interface{}
}

// Aggregate - интерфейс агрегата
type Aggregate interface {
    CreateIterator() Iterator
}

// ConcreteAggregate - конкретный агрегат
type ConcreteAggregate struct {
    items []interface{}
}

func (a *ConcreteAggregate) CreateIterator() Iterator {
    return &ConcreteIterator{aggregate: a, current: 0}
}

// ConcreteIterator - конкретный итератор
type ConcreteIterator struct {
    aggregate *ConcreteAggregate
    current   int
}

func (i *ConcreteIterator) HasNext() bool {
    return i.current < len(i.aggregate.items)
}

func (i *ConcreteIterator) Next() interface{} {
    if i.HasNext() {
        item := i.aggregate.items[i.current]
        i.current++
        return item
    }
    return nil
}

func main() {
    aggregate := &ConcreteAggregate{
        items: []interface{}{"Item1", "Item2", "Item3"},
    }

    iterator := aggregate.CreateIterator()
    for iterator.HasNext() {
        fmt.Println(iterator.Next())
    }
}
```

### 5. Mediator (Посредник)

Описание: Посредник определяет объект, который инкапсулирует способ взаимодействия множества объектов. Тем самым снижается связанность классов и упрощается поддержка.

Когда использовать:

- Когда нужно уменьшить количество прямых связей между объектами, централизовав управление взаимодействием между ними.
- Когда сложно изменить взаимодействие между множеством объектов.

```go
package mediator

import "fmt"

// Mediator - интерфейс посредника
type Mediator interface {
    Notify(sender Component, event string)
}

// Component - базовый компонент
type Component struct {
    mediator Mediator
}

func (c *Component) SetMediator(mediator Mediator) {
    c.mediator = mediator
}

// ComponentA - компонент A
type ComponentA struct {
    Component
}

func (c *ComponentA) DoA() {
    fmt.Println("ComponentA does A")
    c.mediator.Notify(c, "A")
}

// ComponentB - компонент B
type ComponentB struct {
    Component
}

func (c *ComponentB) DoB() {
    fmt.Println("ComponentB does B")
    c.mediator.Notify(c, "B")
}

// ConcreteMediator - конкретный посредник
type ConcreteMediator struct {
    componentA *ComponentA
    componentB *ComponentB
}

func (m *ConcreteMediator) Notify(sender Component, event string) {
    if event == "A" {
        fmt.Println("Mediator reacts on A and triggers B")
        m.componentB.DoB()
    }
}

func main() {
    componentA := &ComponentA{}
    componentB := &ComponentB{}
    mediator := &ConcreteMediator{componentA: componentA, componentB: componentB}

    componentA.SetMediator(mediator)
    componentB.SetMediator(mediator)

    componentA.DoA()
}
```

### 6. Memento (Хранитель)

Описание: Хранитель позволяет сохранять и восстанавливать предыдущее состояние объекта, не нарушая инкапсуляцию.

Когда использовать:

- Когда нужно сохранять состояние объекта, чтобы позднее можно было его восстановить.
- Когда прямое сохранение состояния нарушает инкапсуляцию.

```go
package memento

import "fmt"

// Memento - интерфейс хранителя
type Memento interface {
    GetState() string
}

// ConcreteMemento - конкретный хранитель
type ConcreteMemento struct {
    state string
}

func (m *ConcreteMemento) GetState() string {
    return m.state
}

// Originator - создатель и владелец состояния
type Originator struct {
    state string
}

func (o *Originator) Save() Memento {
    return &ConcreteMemento{state: o.state}
}

func (o *Originator) Restore(memento Memento) {
    o.state = memento.GetState()
}

func (o *Originator) SetState(state string) {
    o.state = state
}

func (o *Originator) GetState() string {
    return o.state
}

func main() {
    originator := &Originator{}
    originator.SetState("State1")
    memento := originator.Save()

    originator.SetState("State2")
    fmt.Println("Current State:", originator.GetState())

    originator.Restore(memento)
    fmt.Println("Restored State:", originator.GetState())
}
```

### 7. Observer (Наблюдатель)

Описание: Наблюдатель определяет зависимость "один ко многим" между объектами, так что при изменении состояния одного объекта все зависящие от него объекты уведомляются и обновляются автоматически.

Когда использовать:

- Когда изменение состояния одного объекта должно приводить к изменению других объектов, и при этом конкретные объекты должны оставаться слабо связанными.
- Когда один объект должен уведомлять другие объекты, не зная, кто именно будет уведомлен.

```go
package observer

import "fmt"

// Observer - интерфейс наблюдателя
type Observer interface {
    Update(state string)
}

// Subject - интерфейс субъекта
type Subject interface {
    Register(observer Observer)
    Unregister(observer Observer)
    Notify()
}

// ConcreteSubject - конкретный субъект
type ConcreteSubject struct {
    observers []Observer
    state     string
}

func (s *ConcreteSubject) Register(observer Observer) {
    s.observers = append(s.observers, observer)
}

func (s *ConcreteSubject) Unregister(observer Observer) {
    for i, obs := range s.observers {
        if obs == observer {
            s.observers = append(s.observers[:i], s.observers[i+1:]...)
            break
        }
    }
}

func (s *ConcreteSubject) Notify() {
    for _, observer := range s.observers {
        observer.Update(s.state)
    }
}

func (s *ConcreteSubject) SetState(state string) {
    s.state = state
    s.Notify()
}

// ConcreteObserver - конкретный наблюдатель
type ConcreteObserver struct {
    name string
}

func (o *ConcreteObserver) Update(state string) {
    fmt.Printf("Observer %s: new state is %s\n", o.name, state)
}

func main() {
    subject := &ConcreteSubject{}

    observer1 := &ConcreteObserver{name: "Observer1"}
    observer2 := &ConcreteObserver{name: "Observer2"}

    subject.Register(observer1)
    subject.Register(observer2)

    subject.SetState("State1")
    subject.SetState("State2")

    subject.Unregister(observer1)
    subject.SetState("State3")
}
```

### 8. State (Состояние)

Описание: Состояние позволяет объекту изменять свое поведение в зависимости от своего состояния. Внешне это выглядит так, как если бы объект изменял свой класс.

Когда использовать:

- Когда поведение объекта должно изменяться в зависимости от его состояния.
- Когда код операций зависит от состояния объекта и имеет много условных операторов, проверяющих состояние.

```go
package state

import "fmt"

// State - интерфейс состояния
type State interface {
    Handle(context *Context)
}

// Context - контекст, который изменяет свое поведение в зависимости от состояния
type Context struct {
    state State
}

func (c *Context) SetState(state State) {
    c.state = state
}

func (c *Context) Request() {
    c.state.Handle(c)
}

// ConcreteStateA - конкретное состояние A
type ConcreteStateA struct{}

func (s *ConcreteStateA) Handle(context *Context) {
    fmt.Println("Handling request in State A")
    context.SetState(&ConcreteStateB{})
}

// ConcreteStateB - конкретное состояние B
type ConcreteStateB struct{}

func (s *ConcreteStateB) Handle(context *Context) {
    fmt.Println("Handling request in State B")
    context.SetState(&ConcreteStateA{})
}

func main() {
    context := &Context{state: &ConcreteStateA{}}
    context.Request()
    context.Request()
    context.Request()
}
```

### 9. Strategy (Стратегия)

Описание: Стратегия определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми. Стратегия позволяет изменять алгоритмы независимо от клиентов, которые ими пользуются.

Когда использовать:

- Когда нужно использовать различные варианты алгоритмов внутри одного объекта.
- Когда нужно выбирать алгоритм во время выполнения программы.

```go
package strategy

import "fmt"

// Strategy - интерфейс стратегии
type Strategy interface {
    Execute(a, b int) int
}

// ConcreteStrategyAdd - конкретная стратегия сложения
type ConcreteStrategyAdd struct{}

func (s *ConcreteStrategyAdd) Execute(a, b int) int {
    return a + b
}

// ConcreteStrategySubtract - конкретная стратегия вычитания
type ConcreteStrategySubtract struct{}

func (s *ConcreteStrategySubtract) Execute(a, b int) int {
    return a - b
}

// Context - контекст, использующий стратегию
type Context struct {
    strategy Strategy
}

func (c *Context) SetStrategy(strategy Strategy) {
    c.strategy = strategy
}

func (c *Context) ExecuteStrategy(a, b int) int {
    return c.strategy.Execute(a, b)
}

func main() {
    context := &Context{}

    context.SetStrategy(&ConcreteStrategyAdd{})
    fmt.Println("Result of addition:", context.ExecuteStrategy(3, 4))

    context.SetStrategy(&ConcreteStrategySubtract{})
    fmt.Println("Result of subtraction:", context.ExecuteStrategy(10, 4))
}
```

### 10. Template Method (Шаблонный метод)

Описание: Шаблонный метод определяет основу алгоритма и позволяет подклассам переопределять некоторые шаги алгоритма, не изменяя его структуру.

Когда использовать:

- Когда нужно определить основу алгоритма и позволить подклассам переопределять определенные шаги алгоритма.
- Когда в различных реализациях алгоритма повторяются одни и те же шаги.

```go
package templatemethod

import "fmt"

// AbstractClass - абстрактный класс с шаблонным методом
type AbstractClass struct{}

func (a *AbstractClass) TemplateMethod() {
    a.Step1()
    a.Step2()
    a.Step3()
}

func (a *AbstractClass) Step1() {
    fmt.Println("AbstractClass: Step1")
}

func (a *AbstractClass) Step2() {
    fmt.Println("AbstractClass: Step2")
}

func (a *AbstractClass) Step3() {
    fmt.Println("AbstractClass: Step3")
}

// ConcreteClass - конкретный класс, переопределяющий шаги алгоритма
type ConcreteClass struct {
    AbstractClass
}

func (c *ConcreteClass) Step2() {
    fmt.Println("ConcreteClass: Step2")
}

func main() {
    concrete := &ConcreteClass{}
    concrete.TemplateMethod()
}
```

### 11. Visitor (Посетитель)

Описание: Посетитель позволяет определить операцию, выполняемую над элементами структуры объекта, не изменяя классы этих элементов. Посетитель позволяет добавить новую операцию, не изменяя классы элементов, над которыми эта операция выполняется.

Когда использовать:

- Когда нужно выполнить операцию над объектами сложной структуры объектов.
- Когда классы, составляющие структуру объектов, редко изменяются, но часто добавляются новые операции над этой структурой.

```go
package visitor

import "fmt"

// Element - интерфейс элемента, принимающего посетителя
type Element interface {
    Accept(visitor Visitor)
}

// Visitor - интерфейс посетителя
type Visitor interface {
    VisitConcreteElementA(element *ConcreteElementA)
    VisitConcreteElementB(element *ConcreteElementB)
}

// ConcreteElementA - конкретный элемент A
type ConcreteElementA struct{}

func (e *ConcreteElementA) Accept(visitor Visitor) {
    visitor.VisitConcreteElementA(e)
}

// ConcreteElementB - конкретный элемент B
type ConcreteElementB struct{}

func (e *ConcreteElementB) Accept(visitor Visitor) {
    visitor.VisitConcreteElementB(e)
}

// ConcreteVisitor - конкретный посетитель
type ConcreteVisitor struct{}

func (v *ConcreteVisitor) VisitConcreteElementA(element *ConcreteElementA) {
    fmt.Println("Visiting ConcreteElementA")
}

func (v *ConcreteVisitor) VisitConcreteElementB(element *ConcreteElementB) {
    fmt.Println("Visiting ConcreteElementB")
}

func main() {
    elements := []Element{&ConcreteElementA{}, &ConcreteElementB{}}
    visitor := &ConcreteVisitor{}

    for _, element := range elements {
        element.Accept(visitor)
    }
}
```
