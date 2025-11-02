# Script para iniciar Sanity Studio
# Ejecutar: .\start-sanity.ps1

Write-Host "🚀 Iniciando Sanity Studio..." -ForegroundColor Cyan

# Verificar si existe la carpeta sanity
if (-Not (Test-Path ".\sanity")) {
    Write-Host "❌ Error: No se encuentra la carpeta 'sanity'" -ForegroundColor Red
    Write-Host "Asegúrate de estar en la raíz del proyecto" -ForegroundColor Yellow
    exit 1
}

# Navegar a la carpeta sanity
Set-Location -Path ".\sanity"

# Verificar si existen node_modules
if (-Not (Test-Path ".\node_modules")) {
    Write-Host "📦 Instalando dependencias de Sanity..." -ForegroundColor Yellow
    npm install
}

# Iniciar Sanity Dev
Write-Host "✨ Abriendo Sanity Studio en http://localhost:3333" -ForegroundColor Green
npm run dev
