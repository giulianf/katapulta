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
	aboutUs: 'src/components/AboutUs',
	aboutEmprunteur: 'src/components/AboutEmprunteur',
	aboutPreteur: 'src/components/AboutPreteur',
	ourService: 'src/components/OurService',
	newsletter: 'src/components/Newsletter',
	contact: 'src/components/Contact',
	fieldGroup: 'src/components/FieldGroup',
	noMatch: 'src/components/NoMatch',
	layout: 'src/components/Layout',
	homePage: 'src/components/HomePage',
	footer: 'src/components/Footer',
	slider: 'src/components/Slider',

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
