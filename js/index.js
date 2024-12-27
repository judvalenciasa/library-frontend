document.addEventListener('DOMContentLoaded', function () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    function loadBooks() {
        fetch("http://biblioteca-backend.test/api/book", requestOptions)
            .then(response => response.json())
            .then(data => {
                let booksListDiv = document.getElementById('booksList');
                booksListDiv.innerHTML = '';

                data.data.forEach(book => {
                    let bookDiv = document.createElement('div');

                    // Formatear la fecha a dd-mm-aaaa
                    let fechaPublicacion = new Date(book['fecha de publicacion']);
                    let formattedDate = ("0" + fechaPublicacion.getDate()).slice(-2) + "-" +
                        ("0" + (fechaPublicacion.getMonth() + 1)).slice(-2) + "-" +
                        fechaPublicacion.getFullYear();

                    bookDiv.innerHTML = `
                        <session class="card">
                            <div class="card-head">
                                <h3>Código: ${book.id_book}</h3>
                            </div>
                            <div class="card-body">
                                <h4 class="label">${book.nombre}</h4>
                                <p class="label">Autor: ${book.autor}</p>
                                <p class="label">Fecha de Publicación: ${formattedDate}</p>
                                <p class="label">Género: ${book.genero}</p>
                                <p class="label">Categoría: ${book.categoria}</p>
                            </div>

                        </session>
                    `;
                    booksListDiv.appendChild(bookDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Cargar los libros automáticamente al cargar la página
    loadBooks();

});