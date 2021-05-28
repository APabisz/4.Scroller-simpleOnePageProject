document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded")

  const rootElement = document.querySelector("#root")
  const sections = document.querySelectorAll("#root .section")
  console.log(sections)

  document.addEventListener("wheel", function (e) {
    console.log(e.deltaY)
  })
})
