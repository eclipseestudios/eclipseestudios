/* ==========================================================================
   LA HERENCIA MALDITA — Capa interactiva
   Revelado de pistas, progreso, acertijo y desbloqueo de secreto.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  // Año dinámico del footer
  var yearEl = document.getElementById("year")
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear()
  }

  /* ----- PISTAS ----- */
  var clueCards = Array.prototype.slice.call(document.querySelectorAll(".clue-card"))
  var clueProgress = document.getElementById("clueProgress")
  var riddleBlock = document.getElementById("riddleBlock")
  var revealedClues = {}

  function updateProgress() {
    var count = Object.keys(revealedClues).length
    var total = clueCards.length
    if (clueProgress) {
      clueProgress.textContent = count + " / " + total + " pistas reveladas"
    }

    // Al revelar todas las pistas, se desbloquea el acertijo
    if (count === total && riddleBlock && riddleBlock.hasAttribute("hidden")) {
      riddleBlock.removeAttribute("hidden")
      riddleBlock.classList.add("is-appearing")
      clueProgress.textContent = "Todas las pistas reveladas — un acertijo emerge abajo"
    }
  }

  clueCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var key = card.getAttribute("data-clue")
      card.classList.add("is-open")
      revealedClues[key] = true
      updateProgress()
    })
  })

  /* ----- ACERTIJO ----- */
  var riddleForm = document.getElementById("riddleForm")
  var riddleInput = document.getElementById("riddleInput")
  var riddleFeedback = document.getElementById("riddleFeedback")
  var riddleUnlocked = document.getElementById("riddleUnlocked")

  // Respuestas válidas (normalizadas: sin acentos, minúsculas)
  var validAnswers = ["muneco", "el muneco", "muñeco", "el muñeco", "un muneco"]

  function normalize(text) {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
  }

  if (riddleForm) {
    riddleForm.addEventListener("submit", function (event) {
      event.preventDefault()
      var answer = normalize(riddleInput.value)

      if (validAnswers.indexOf(answer) !== -1) {
        riddleFeedback.textContent = "Correcto. El secreto se revela..."
        riddleFeedback.classList.remove("is-wrong")
        riddleFeedback.classList.add("is-right")
        if (riddleUnlocked) {
          riddleUnlocked.removeAttribute("hidden")
          riddleUnlocked.classList.add("is-appearing")
        }
        riddleInput.disabled = true
      } else if (answer === "") {
        riddleFeedback.textContent = "Escribe una respuesta para continuar."
        riddleFeedback.classList.remove("is-right")
        riddleFeedback.classList.add("is-wrong")
      } else {
        riddleFeedback.textContent = "No es eso... Vuelve a mirar las pistas."
        riddleFeedback.classList.remove("is-right")
        riddleFeedback.classList.add("is-wrong")
      }
    })
  }

  /* ----- EASTER EGG: LA ROSA BLANCA ----- */
  var roseBtn = document.getElementById("roseBtn")
  var roseHint = document.getElementById("roseHint")
  var roseLink = document.getElementById("roseLink")
  var roseTouches = 0

  // Susurros que van cambiando conforme el espectador insiste con la rosa
  var roseWhispers = [
    "Algo se mueve entre los pétalos...",
    "La rosa se estremece. Sigue.",
    "Casi puedes oír una voz pidiendo que entres.",
  ]

  if (roseBtn) {
    roseBtn.addEventListener("click", function () {
      roseTouches += 1

      if (roseTouches < 3) {
        // La rosa va "despertando" con cada toque
        roseBtn.classList.add("rose-stir")
        window.setTimeout(function () {
          roseBtn.classList.remove("rose-stir")
        }, 600)
        if (roseHint) {
          roseHint.textContent = roseWhispers[roseTouches - 1]
        }
      } else {
        // Al tercer toque, la rosa florece y revela el portal
        roseBtn.classList.add("rose-bloom")
        if (roseHint) {
          roseHint.textContent = "La rosa blanca se abre por completo."
        }
        if (roseLink) {
          roseLink.removeAttribute("hidden")
          roseLink.classList.add("is-appearing")
        }
        roseBtn.setAttribute("disabled", "true")
      }
    })
  }
})
