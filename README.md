# Forecast

Forecast es una aplicación empresarial para control, visualización y cálculo de información asociada a voladuras.

El sistema toma datos operativos desde una base de datos externa, los resume por voladura y permite completar información manual necesaria para generar cálculos técnicos, costos, conciliaciones y balances.

## Propósito

Centralizar datos que antes se manejaban en hojas de cálculo, reduciendo errores manuales y permitiendo una vista más controlada, trazable y actualizada de la información.

## Alcance

Forecast maneja:

- Resúmenes por voladura
- Datos importados desde una base externa
- Datos ingresados por administradores
- Campos calculados
- Estados de validación y cierre
- Observaciones y trazabilidad
- Base para cálculos de cobro, préstamos, conciliaciones y balances

## Arquitectura general

```txt
forecast/
├── forecast-api   # Backend Spring Boot
└── forecast-web   # Frontend React
```

# Stack

- Backend: Java + Spring Boot + PostgreSQL + Flyway
- Frontend: React + Vite + Tailwind CSS
