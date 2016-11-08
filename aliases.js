module.exports = {
	appDispatcher: 'src/dispatcher/AppDispatcher',

	// Actions
	layoutActions: 'src/actions/LayoutActions',

	// Components
    // preteur
  	preteur: 'src/components/Preteur',
    // emprunteur
  	emprunteur: 'src/components/Emprunteur',
    //FAQ
	faq: 'src/components/Faq',
	noMatch: 'src/components/NoMatch',
	layout: 'src/components/Layout',
	homePage: 'src/components/HomePage',
	footer: 'src/components/Footer',

	// Constants
	actionTypes: 'src/constants/ActionTypes',
	layoutConstants: 'src/constants/LayoutConstants',
	webServiceConstants: 'src/constants/WebServiceConstants',

	// Services
	authService: 'src/services/AuthService',
	layoutService: 'src/services/LayoutService',

	// Stores
	baseStore: 'src/stores/BaseStore',
	layoutStore: 'src/stores/LayoutStore'
};
