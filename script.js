document.addEventListener("DOMContentLoaded", () => {
  const introPortal = document.getElementById("introPortal")
  const introVideoLayer = document.getElementById("introVideoLayer")
  const portalOptions = document.getElementById("portalOptions")

  const btnHorror = document.getElementById("btnHorror")
  const btnCosmic = document.getElementById("btnCosmic")
  const btnSkip = document.getElementById("btnSkip")
  const introFrame = document.getElementById("introVimeo")

  // Evita que el portal se ejecute si no existe en la página (ej. herencia.html)
  if (!introPortal) return

  // REVELAR OPCIONES: desvanece el video y muestra los dos botones suavemente
  const revealOptions = () => {
    if (introVideoLayer) {
      introVideoLayer.classList.add("is-fading")
    }
    window.setTimeout(() => {
      if (introVideoLayer) introVideoLayer.setAttribute("aria-hidden", "true")
      if (portalOptions) portalOptions.classList.add("is-visible")
    }, 900)
  }

  // CERRAR PORTAL: desvanece la pantalla negra y entra a la web principal
  const closeIntroPortal = () => {
    introPortal.classList.add("is-closed")
    window.setTimeout(() => {
      introPortal.setAttribute("hidden", "")
      introPortal.remove() // Libera el elemento de la memoria
    }, 800)
  }

  // "La Herencia" lleva a una página/proyecto aparte
  if (btnHorror) {
    btnHorror.addEventListener("click", () => {
      window.location.href = "herencia.html"
    })
  }

  // "Conoce Eclipse Estudios" entra al sitio principal
  if (btnCosmic) btnCosmic.addEventListener("click", closeIntroPortal)

  // Botón opcional para saltar la intro directamente
  if (btnSkip) btnSkip.addEventListener("click", revealOptions)

  // CONTROL DEL REPRODUCTOR DE VIMEO
  if (window.Vimeo && introFrame) {
    const player = new window.Vimeo.Player(introFrame)

    // Intentamos reproducir CON sonido desde el inicio
    player.setVolume(1)
    player
      .play()
      .catch(() => {
        // Si el navegador bloquea el autoplay con sonido, pedimos un gesto del usuario
        introPortal.classList.add("needs-sound-gesture")
      })

    // Cuando el video termina, revela las dos opciones
    player.on("ended", revealOptions)

    // Respaldo: si en 30s el video no terminó, igual mostramos las opciones
    window.setTimeout(revealOptions, 30000)
  } else {
    // Respaldo inmediato si la API de Vimeo no carga
    revealOptions()
  }

  // Si el navegador pidió un gesto para el sonido, lo activamos al hacer clic
  introPortal.addEventListener("click", () => {
    if (introPortal.classList.contains("needs-sound-gesture")) {
      introPortal.classList.remove("needs-sound-gesture")
      if (window.Vimeo && introFrame) {
        const player = new window.Vimeo.Player(introFrame)
        player.setVolume(1)
        player.play()
      }
    }
  })
})
