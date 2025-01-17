describe('Inscription utilisateur', function () {
  let users;// variable globalement

  // Charger les données utilisateur avant les tests
  before(() => {
    cy.fixture("data").then((data) => {
      users = data; 
    });
  });

  it('Remplit le formulaire pour chaque utilisateur', function () {
    // Vérifier que les données sont chargées
    expect(users).to.exist;

    // Parcourir chaque utilisateur dans les données
    users.forEach((user, index) => {
      // Étape 1 : Accéder à la page d'inscription
      cy.visit('https://www.campusfrance.org/fr/user/register');

      // Étape 2 : Remplir l'adresse email et le mot de passe
      cy.get('input[placeholder="monadresse@domaine.com"]').type(user.email);
      cy.get('#edit-pass-pass1').type(user.motDePasse);
      cy.get('#edit-pass-pass2').type(user.motDePasse);

      // Étape 3 : Sélectionner la civilité en fonction du genre
      if (user.genre === 'Mme') {
        cy.get('label[for="edit-field-civilite-mme"]').click();
      } else if (user.genre === 'Mr') {
        cy.get('label[for="edit-field-civilite-mr"]').click();
      } else {
        throw new Error(`Genre non reconnu : ${user.genre}`);
      }

      // Étape 4 : Renseigner le nom et le prénom
      cy.get('#edit-field-nom-0-value').type(user.nom);
      cy.get('#edit-field-prenom-0-value').type(user.prenom);

      // Étape 5 : Sélectionner le pays de naissance
      cy.get('#edit-field-pays-concernes-selectized').click();
      cy.contains('.option', `-${user.paysNaissance}`).click();

      // Étape 6 : Renseigner les autres informations
      cy.get('#edit-field-nationalite-0-target-id').type(user.nationalite);
      cy.get('#edit-field-code-postal-0-value').type(user.c_postal);
      cy.get('#edit-field-ville-0-value').type(user.ville);
      cy.get('#edit-field-telephone-0-value').type(user.numerTel);

      // Étape 7 : Sélectionner le domaine et le niveau d'étude si applicable
      if (user.statut === 'Étudiants') {
        cy.get('input#edit-field-publics-cibles-2').check({ force: true });
      } else if (user.statut === 'Chercheurs') {
        cy.get('input#edit-field-publics-cibles-3').check({ force: true });
      }
      
      // Actions communes pour le domaine et le niveau d’étude
      cy.get('#edit-field-domaine-etudes-wrapper .selectize-input').click();
      cy.contains('#edit-field-domaine-etudes-wrapper .option', user.domaine).click();
      
      cy.get('#edit-field-niveaux-etude-wrapper .selectize-input').click();
      cy.contains('#edit-field-niveaux-etude-wrapper .option', user.niveau).click();
      

      // Étape 8 : Accepter les communications
      cy.get('#edit-field-accepte-communications-value').check({ force: true });
    });
  });
});
