document.addEventListener('DOMContentLoaded', ()=>
{
    //This line was put later on the network part
    const socket = io.connect()
    const pincel = 
    {   
        ativo:false,
        movendo:false,
        pos:{x:0, y:0},
        posAnterior:null
    }

    const tela = document.querySelector('#tela')

    const ctx = tela.getContext('2d')

    tela.width = 700
    tela.height = 500

    ctx.lineWidth = 7
    ctx.strokeStyle = 'blue'

    const desenharLinha = (linha) =>
    {
        ctx.beginPath()
        ctx.moveTo(linha.posAnterior.x, linha.posAnterior.y)
        ctx.lineTo(linha.pos.x, linha.pos.y)
        ctx.stroke()
    } 
    
    tela.onmousedown = (e) =>
    {
        pincel.ativo = true
    }

    tela.onmouseup = (e) =>
    {
        pincel.ativo = false
    }

    tela.onmousemove = (e) =>
    {
        pincel.pos.x = e.clientX
        pincel.pos.y = e.clientY
        pincel.movendo = true
    }

    //Aqui enviamos pro servidor o que escreviamos
    //localmente no nao network
    socket.on('desenhar', (linha)=>
    {
        desenharLinha(linha)
    })

    const ciclo = () => 
    {
        if(pincel.ativo && pincel.movendo && pincel.posAnterior)
        {
            socket.emit('desenhar',{pos:pincel.pos, posAnterior:pincel.posAnterior})
            //desenharLinha({pos:pincel.pos, posAnterior:pincel.posAnterior})
            pincel.movendo = false
        }
        pincel.posAnterior = {x:pincel.pos.x, y:pincel.pos.y}

        //setTimeout(ciclo, 100)
    window.requestAnimationFrame(ciclo)
       

    }
    
    window.requestAnimationFrame(ciclo)
})
