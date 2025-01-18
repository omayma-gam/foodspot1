document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipe = recipes[recipeId];

        if (recipe) {
            const recipeDetailContent = document.getElementById('recipeDetailContent');
            recipeDetailContent.innerHTML = `
                <div class="recipe-details">
                    <div class="text-center mb-4">
                        <img src="${recipe.image || 'placeholder.jpg'}" class="recipe-img" alt="${recipe.title}">
                    </div>
                    <h1 class="text-center mb-4">${recipe.title}</h1>
                    <div class="row">
                        <div class="col-md-8 mx-auto">
                            <div class="mb-4">
                                <h4>Description</h4>
                                <p class="lead">${recipe.description}</p>
                            </div>
                            <div class="mb-4">
                                <h4>Catégorie</h4>
                                <p>${recipe.category}</p>
                            </div>
                            <div class="text-center mt-4">
                                <a href="javascript:history.back()" class="btn btn-primary">Retour</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('recipeDetailContent').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Recette non trouvée!
                </div>
            `;
        }
    }
});
