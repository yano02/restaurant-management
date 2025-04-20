const { Product } = require('../models');
const { ask, closeInterface } = require('./common');

async function createProduct() {
  console.log('\n--- Créer un produit ---');

  try {
    const name = await ask('Nom du produit : ');
    const description = await ask('Description du produit : ');

    const newProduct = await Product.create({ name, description });

    console.log('\n✅ Produit ajouté avec succès :');
    console.log(`ID : ${newProduct.id}, Nom : ${newProduct.name}`);
  } catch (error) {
    console.error('❌ Erreur lors de la création du produit :', error.message);
  }
}

async function listProducts() {
  console.log('\n--- Liste des produits ---');

  try {
    const products = await Product.findAll();

    if (products.length === 0) {
      console.log('Aucun produit trouvé.');
    } else {
      products.forEach(p => {
        console.log(`ID : ${p.id} | Nom : ${p.name} | Description : ${p.description || 'N/A'}`);
      });
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits :', error.message);
  }
}

async function updateProduct() {
  console.log('\n--- Modifier un produit ---');

  try {
    const id = await ask('ID du produit à modifier : ');
    const product = await Product.findByPk(id);

    if (!product) {
      console.log('❌ Produit introuvable.');
      return;
    }

    const name = await ask(`Nouveau nom (${product.name}) : `);
    const description = await ask(`Nouvelle description (${product.description || 'N/A'}) : `);

    product.name = name || product.name;
    product.description = description || product.description;

    await product.save();

    console.log('✅ Produit mis à jour avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour :', error.message);
  }
}

async function deleteProduct() {
  console.log('\n--- Supprimer un produit ---');

  try {
    const id = await ask('ID du produit à supprimer : ');
    const product = await Product.findByPk(id);

    if (!product) {
      console.log('❌ Produit introuvable.');
      return;
    }

    await product.destroy();
    console.log('✅ Produit supprimé avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression :', error.message);
  }
}

module.exports = {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct
};
