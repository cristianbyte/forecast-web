---
name: readable-code
description: >
  Nomenclatura y estructura de código legible para Java y JavaScript. Usar siempre
  al escribir, revisar o nombrar variables, funciones, métodos, clases, constantes
  o parámetros en Java o JS/TS. También al refactorizar o pedir código más claro.
---

# Nomenclatura legible — Java & JavaScript

## Regla base
Una palabra sola casi siempre es ambigua. Nombre = contexto + propósito.

```
// ❌ data, result, temp, value, flag, obj
// ✅ invoiceTotal, failedLoginAttempts, activeUserList
```

---

## Java

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Clase | PascalCase, sustantivo | `InvoiceCalculator`, `UserAuthenticator` |
| Método | camelCase, verbo+objeto | `calculateTotalWithTax()`, `sendConfirmationEmail()` |
| Variable | camelCase, sustantivo descriptivo | `failedLoginAttempts`, `sessionTimeoutSeconds` |
| Constante | UPPER_SNAKE_CASE | `MAX_LOGIN_ATTEMPTS`, `VAT_RATE` |
| Booleano | prefijo `is`/`has`/`can` | `isActive`, `hasPermission`, `canRetry` |

```java
// ❌
int x = 3;
boolean flag = true;
void process(List data) { ... }

// ✅
int maxLoginAttempts = 3;
boolean isSessionExpired = true;
void processExpiredSessions(List<Session> activeSessions) { ... }
```

---

## JavaScript / TypeScript

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Variable / función | camelCase | `calculateDiscount()`, `userEmailAddress` |
| Clase | PascalCase | `PaymentProcessor`, `CartItem` |
| Archivo/módulo | kebab-case | `user-auth.js`, `invoice-calculator.ts` |
| Constante global | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Booleano | prefijo `is`/`has`/`can` | `isLoading`, `hasError`, `canSubmit` |

```js
// ❌
const d = await get(id);
let flag = false;
function handle(x, y) { ... }

// ✅
const orderDetails = await fetchOrderById(orderId);
let isPaymentProcessed = false;
function applyDiscountToCart(cart, discountCode) { ... }
```

---

## Funciones: un verbo, un propósito

Si la descripción incluye "y", dividir.

```java
// ❌ hace todo
void processOrder(Order order) {
    // valida + calcula + guarda + envía email
}

// ✅ orquesta, cada función hace una cosa
void processOrder(Order order) {
    validateOrder(order);
    Money total = calculateTotalWithTax(order);
    updateInventory(order.getItems());
    sendConfirmationEmail(order.getCustomer(), total);
}
```

---

## Checklist

- [ ] ¿El nombre dice qué es/hace sin leer el cuerpo?
- [ ] ¿Hay un solo verbo/propósito?