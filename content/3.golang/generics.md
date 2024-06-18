---
title: Дженерики
---

## Чем кодогенерация отличается от дженериков?

Кодогенерация и дженерики - это два способа написания кода, который не зависит от конкретных типов данных. Однако, они отличаются по тому, когда и как происходит привязка к типам.

Кодогенерация - это процесс создания кода из другого кода или данных с помощью специальных инструментов или команд. Кодогенерация позволяет писать обобщенный код, который затем преобразуется в конкретный код для каждого типа данных. Кодогенерация происходит на этапе компиляции или до него, то есть до выполнения программы. Кодогенерация может быть полезна для увеличения производительности, избежания дублирования кода или реализации сложной логики.

Дженерики - это способ написания кода, который параметризован по типам данных. Дженерики позволяют писать функции и типы, которые работают с любыми типами данных, передавая их в качестве аргументов. Дженерики происходят на этапе выполнения, то есть во время работы программы. Дженерики могут быть полезны для повышения выразительности, уменьшения количества кода или поддержки полиморфизма.

## В какой версии появились дженерики?

В языке Go до версии 1.18 не было поддержки дженериков, поэтому разработчики часто использовали кодогенерацию или рефлексию для написания обобщенного кода. 

В версии 1.18 добавлена поддержка дженериков с помощью параметров типов (type parameters), которые позволяют определять функции и типы, которые принимают любые типы данных в качестве аргументов.

## Как работают дженерики под капотом?

Дженерики под капотом в golang работают с помощью механизма, который называется type substitution (подстановка типов). Это означает, что при компиляции программы, компилятор заменяет параметры типов в дженерических функциях и типах на конкретные типы, которые передаются в качестве аргументов. 

Например, если мы имеем такую дженерическую функцию:

```go
func Map[F, T any](s T, f F) []T {
  r := make([]T, len(s))
  for i, v := range s {
    r[i] = f(v)
  }
  return r
}
```

И мы вызываем ее так:

```go
s := []int{1, 2, 3}
f := func(x int) string { return strconv.Itoa(x) }
t := Map(s, f)
```

То компилятор преобразует ее в такую функцию:

```go
func Map_int_string(s []int, f func(int) string) []string {
  r := make([]string, len(s))
  for i, v := range s {
    r[i] = f(v)
  }
  return r
}
```

И вызывает ее так:

```go
s := []int{1, 2, 3}
f := func(x int) string { return strconv.Itoa(x) }
t := Map_int_string(s, f)
```

Таким образом, дженерики под капотом в golang не требуют дополнительной памяти или рефлексии, так как они превращаются в обычный код для каждого типа данных. 

Однако, это также означает, что дженерики под капотом в golang могут привести к увеличению размера исполняемого файла, так как для каждого типа данных создается своя версия дженерической функции или типа

Источники: 
- [Habr](https://habr.com/ru/companies/karuna/articles/552944/)
- [Habr](https://habr.com/ru/companies/skillfactory/articles/657853/)
