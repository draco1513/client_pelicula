export default function headerRequest() {
    let user = JSON.parse(localStorage.getItem("infoFilmFiesta"));
    if (user && user.token) {
      return { 'Authorization': "Bearer " + user.token };
    }
}