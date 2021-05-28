document.addEventListener("DOMContentLoaded", () => {
  const scroller = new Scroller("#root")

  document.addEventListener("wheel", scroller.listenScroll)

  document.addEventListener("swipeUp", () => scroller.scroll(-1))
  document.addEventListener("swipeDown", () => scroller.scroll(1))

  document.addEventListener("keydown", (e) => {
    if (e.key !== undefined) {
      switch (e.key) {
        case "ArrowUp":
          scroller.scroll(-1)
          break
        case "ArrowDown":
          scroller.scroll(1)
          break
      }
    }
  })
})
