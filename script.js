document.addEventListener('DOMContentLoaded', function () {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];


    function displayRecipes(filteredRecipes = recipes) {
        const wineCards = document.getElementById('wineCards');
        if (!wineCards) return;
        
        wineCards.innerHTML = '';
    
        filteredRecipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${recipe.image || 'placeholder.jpg'}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <a href="RecetteDetail.html?id=${index}" class="btn btn-primary mb-2">Voir plus</a>
                        <button class="btn btn-danger mb-2" onclick="deleteRecipe(${index})">Supprimer</button>
                        <button class="btn btn-warning" onclick="editRecipe(${index})">Modifier</button>
                    </div>
                </div>
            `;
            wineCards.appendChild(card);
        });
    }
    window.deleteRecipe = function(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            recipes.splice(index, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
        }
    };
    window.editRecipe = function(index) {
        const recipe = recipes[index];
        const editFormHTML = `
            <form id="editRecipeForm" class="container mt-4">
                <h2 class="mb-4">Modifier la recette</h2>
                <div class="mb-3">
                    <label for="editTitle" class="form-label">Titre</label>
                    <input type="text" class="form-control" id="editTitle" value="${recipe.title}" required>
                </div</div>
                <div class="mb-3">
                    <label for="editDescription" class="form-label">Description</label>
                    <textarea class="form-control" id="editDescription" required>${recipe.description}</textarea>
                </div>
                <div class="mb-3">
                    <label for="editCategory" class="form-label">Catégorie</label>
                    <select class="form-select" id="editCategory" required>
                        <option ${recipe.category === 'Entree' ? 'selected' : ''}>Entrée</option>
                        <option ${recipe.category === 'Plat-Principal' ? 'selected' : ''}>Plat Principal</option>
                        <option ${recipe.category === 'Dessert' ? 'selected' : ''}>Dessert</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="editImage" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="editImage" value="${recipe.image}" required>
                </div>
                <button type="submit" class="btn btn-primary">Sauvegarder</button>
                <button type="button" class="btn btn-secondary" onclick="window.location.reload()">Annuler</button>
            </form>
        `;

        const mainContent = document.querySelector('#wineCards');
        if (mainContent) {
            mainContent.innerHTML = editFormHTML;
        }

        const editForm = document.getElementById('editRecipeForm');
        if (editForm) {
            editForm.addEventListener('submit', function(e) {
                e.preventDefault();
                recipes[index] = {
                    title: document.getElementById('editTitle').value,
                    description: document.getElementById('editDescription').value,
                    category: document.getElementById('editCategory').value,
                    image: document.getElementById('editImage').value,
                };

                localStorage.setItem('recipes', JSON.stringify(recipes));
                window.location.reload();
            });
        }
    };


    const addRecipeForm = document.getElementById('addRecipeForm');
    if (addRecipeForm) {
        addRecipeForm.addEventListener('submit', function(e) {
            e.preventDefault();


            const newRecipe = {
                title: document.getElementById('recipeTitle').value,
                description: document.getElementById('recipeDescription').value,
                category: document.getElementById('recipeCategory').value,
                image: document.getElementById('recipeImage').value || 'placeholder.jpg',
            };

            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));

            window.location.href = 'Accueil.html';
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm) ||
                recipe.description.toLowerCase().includes(searchTerm)
            );
            displayRecipes(filteredRecipes);
        });
    }

    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const selectedCategory = this.value;
            if (selectedCategory === 'Catégorie') {
                displayRecipes();
            } else {
                const filteredRecipes = recipes.filter(recipe => recipe.category === selectedCategory);
                displayRecipes(filteredRecipes);
            }
        });
    }
    displayRecipes();
});