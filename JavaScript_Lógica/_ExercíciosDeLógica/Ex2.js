function ePaisagem (largura, altura){ // para retornar apenas true or false, é só cortar os depois da interrogação
    return largura > altura ? `Está no modo paisagem` : `Está no modo horizontal`; // função que retorna true se estiver no modo paisagem 
}

console.log(ePaisagem(1920, 1080))
console.log(ePaisagem(1080,1920 ))