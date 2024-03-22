---
title: Kubernetes (k8s)
sidebar_position: 5
---

## Что такое Kubernetes

Kubernetes (k8s) - это платформа для автоматизации развертывания, масштабирования и управления контейнеризированными приложениями. Kubernetes позволяет управлять контейнерами на нескольких хостах, обеспечивая автоматическое масштабирование, балансировку нагрузки, самовосстановление и многое другое.

## Какие компоненты входят в Kubernetes

Основные компоненты Kubernetes:
- **Master Node**: управляющий узел, который управляет кластером Kubernetes.
- **Worker Node**: рабочий узел, на котором запускаются контейнеры.
- **Pod**: минимальная единица развертывания в Kubernetes, содержащая один или несколько контейнеров.
- **ReplicaSet**: контроллер, который обеспечивает желаемое количество запущенных копий Pod.
- **Deployment**: контроллер, который управляет ReplicaSet и обеспечивает обновление и масштабирование приложений.
- **Service**: абстракция, которая определяет доступ к набору Pod.
- **Volume**: механизм для постоянного хранения данных в Kubernetes.
- **Namespace**: механизм для организации и изоляции ресурсов в Kubernetes.

## Какие преимущества Kubernetes

- **Масштабируемость**: Kubernetes позволяет легко масштабировать приложения горизонтально и вертикально.
- **Отказоустойчивость**: Kubernetes обеспечивает автоматическое восстановление после сбоев.
- **Самообслуживание**: Kubernetes позволяет разработчикам самостоятельно развертывать и управлять приложениями.
- **Гибкость**: Kubernetes поддерживает различные типы приложений и инструменты.
- **Открытость**: Kubernetes является open-source проектом и имеет активное сообщество разработчиков.

## Какие инструменты для управления Kubernetes

- **kubectl**: официальный инструмент командной строки для управления Kubernetes.
- **Helm**: пакетный менеджер для Kubernetes, который упрощает установку и управление приложениями.
- **kubeadm**: инструмент для развертывания кластера Kubernetes.
- **kops**: инструмент для развертывания кластера Kubernetes в AWS.
- **kubespray**: инструмент для развертывания кластера Kubernetes с использованием Ansible.
- **kubectx**: инструмент для управления контекстами Kubernetes.
- **kubens**: инструмент для управления пространствами имен Kubernetes.

## Как создать Pod в Kubernetes

1. Создайте файл `pod.yaml`, описывающий Pod.
2. Примените файл с помощью команды `kubectl apply -f pod.yaml`.

Пример `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
    spec:
    containers:
        - name: nginx
        image: nginx:latest
        ports:
            - containerPort: 80
```

## Как масштабировать приложение в Kubernetes

1. Создайте файл `deployment.yaml`, описывающий Deployment.
2. Примените файл с помощью команды `kubectl apply -f deployment.yaml`.
3. Измените количество реплик в Deployment с помощью команды `kubectl scale deployment <deployment-name> --replicas=<replica-count>`.
4. Kubernetes автоматически создаст или удалит Pod в соответствии с желаемым количеством реплик.

Пример `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
    replicas: 3
    selector:
        matchLabels:
        app: nginx
    template:
        metadata:
        labels:
            app: nginx
        spec:
        containers:
            - name: nginx
            image: nginx:latest
            ports:
                - containerPort: 80
```

## Каковы способы обеспечения безопасности API в Kubernetes

- **RBAC (Role-Based Access Control)**: механизм управления доступом на основе ролей.
- **Network Policies**: механизм управления сетевым доступом к Pod.
- **Pod Security Policies**: механизм управления безопасностью Pod.
- **Service Accounts**: механизм управления доступом к API Kubernetes.

## Зачем использует Kube-apiserver?

`kube-apiserver` - это компонент Kubernetes, который предоставляет API для управления кластером Kubernetes. Он обрабатывает запросы от различных клиентов, таких как `kubectl`, и взаимодействует с другими компонентами кластера для управления ресурсами.

## Расскажите, как вы будете запускать приложение в Kubernetes, если из инструментов у вас только kubectl?

Для запуска приложения в Kubernetes необходимо упаковать его в контейнер, создать Deployment для запуска контейнера в виде набора реплик (подов), настроить сервис LoadBalancer для доступа к приложению из интернета, и создать Ingress для маршрутизации трафика до приложения

1. Упаковать приложение в контейнер и загрузить его в Docker Registry.
2. Создать Deployment, описывающий контейнер с приложением.
3. Применить Deployment с помощью команды `kubectl apply -f deployment.yaml`.
4. Создать Service, описывающий доступ к Deployment.
5. Применить Service с помощью команды `kubectl apply -f service.yaml`.
6. Создать Ingress, описывающий маршрутизацию трафика до Service.
7. Применить Ingress с помощью команды `kubectl apply -f ingress.yaml`.

## Какие типы сервисов в Kubernetes вы знаете?

- **ClusterIP**: сервис с внутренним IP-адресом, доступный только внутри кластера.
- **NodePort**: сервис с открытым портом на каждом узле кластера.
- **LoadBalancer**: сервис с облачным балансировщиком нагрузки.
- **ExternalName**: сервис с внешним DNS-именем.
