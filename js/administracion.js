
document.addEventListener('DOMContentLoaded', function() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    

    function limpiarCampos() {
        document.getElementById('addTitle').value = '';
        document.getElementById('addAuthor').value = '';
        document.getElementById('addYear').value = '';
        document.getElementById('addGenre').value = '';
        document.getElementById('addCategory').value = '';
        document.getElementById('updateTitle').value = '';
        document.getElementById('updateAuthor').value = '';
        document.getElementById('updateYear').value = '';
        document.getElementById('updateGenre').value = '';
        document.getElementById('updateCategory').value = '';
        document.getElementById('updateId').value = '';
        document.getElementById('deleteId').value = '';
    }

    function redirigirAPaginaPrincipal() {
        window.location.href = '../index.html';
    }

    // Función para añadir un libro
    document.getElementById('adicion-book-form').addEventListener('submit', function(event) {
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        
        
        event.preventDefault();
    
        const bookData = {
            title: document.getElementById('addTitle').value,
            author: document.getElementById('addAuthor').value,
            date_publication: formatDate(document.getElementById('addYear').value),
            gender: document.getElementById('addGenre').value,
            category: document.getElementById('addCategory').value
        };
    
        fetch("http://biblioteca-backend.test/api/book", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(bookData),
            redirect: "follow"
        })
        .then(response => {
            
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Libro añadido:', data);
            alert('Libro añadido exitosamente.');
            limpiarCampos();
            redirigirAPaginaPrincipal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: '+ error.message);
        });
    });
    
    

    // Función para actualizar un libro
    document.getElementById('update-book-form').addEventListener('submit', function(event) {
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        
        event.preventDefault();

        const bookData = {
            title: document.getElementById('updateTitle').value,
            author: document.getElementById('updateAuthor').value,
            date_publication: formatDate(document.getElementById('updateYear').value),
            gender: document.getElementById('updateGenre').value,
            category: document.getElementById('updateCategory').value
        };

        const bookId = document.getElementById('updateId').value;

        fetch(`http://biblioteca-backend.test/api/book/${bookId}`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(bookData),
            redirect: "follow"
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Libro actualizado exitosamente.');
            limpiarCampos();
            redirigirAPaginaPrincipal();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al actualizar el libro. Por favor, intenta nuevamente.');
        });
    });

    // Función para borrar un libro
    document.getElementById('delete-book-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const bookId = document.getElementById('deleteId').value;

        fetch(`http://biblioteca-backend.test/api/book/${bookId}`, {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            alert('Libro borrado exitosamente.');
            console.log('Libro borrado:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al borrar el libro. Por favor, intenta nuevamente. Error: ' + error.message);
        });
    });
});