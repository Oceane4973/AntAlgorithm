# Antman

Oui je suis une fourmis
Océane aussi en est une, et oui ! :)

## Norme de nommage

### Files

Les fichiers suivent la norme Camel Case, exemple: `monFichier.js`

Si les fichiers contiennent et exportent une class alors c'est la norme Pascal Case qui s'applique: `MonFichier.js`

(en gros, si ton fichier exporte une classe tu mets les majuscules sinon non)

### Folders

Les dossiers suivent la norme Kebab Case, exemple `mon-dossier`

Pour chaque élément du MVC il faut le mettre dans son dossier attitré, exemple: pour le controlleur de Ant cela donnerait:
`src/controllers/ant/AntController.controller.js`

### Branch

La zone d'en dessous c'est comment on faisait avant mais en vrai ça n'a aucun sens de faire 1 branche par tâche, je pense que le mieux c'est de faire 1 branche par fonctionnalité non ?

```

Les branches sont nommés à partir de l'élément associé, prenons comme exemple la tâche "F5 - Création de l'interface de contrôle",
la branche associé sera alors `interface`. 

Autre exemple: la tâche "F17 - créer le controlleur de la fourmis" sera alors `ant_controller`.
```

Les branches créées doivent **SYSTÉMATIQUEMENT** se baser sur la branche `develop`.

### MVC

Pour un objet donné les classes devront s'appeler en fonction de son rôle, avec pour exemple la classe `Ant`:
- AntModel.model.js
- AntView.view.js
- AntController.controller.js

ps: je sais que tu trouves pas beau la répétition dans "Ant**Model**.**model**.js mais sinon le fichier s'appelerait `Ant` partout et ça poserait des soucis de conflit

#### Controllers

Les controlleurs sont dans le dossier `src/controllers` et doivent
se nommer d'après la norme suivante `NomDuController.controller.js`

#### Views

Les vues sont dans le dossier `src/views` et doivent
se nommer d'après la norme suivante `NomDeLaView.view.js`

#### Models

Les modèles sont dans le dossier `src/models` et doivent
se nommer d'après la norme suivante `NomDuModele.model.js`
