module.exports = {
	appDispatcher: 'src/clientdispatcher/AppDispatcher',

	// Actions
	simulateurActions: 'src/clientactions/SimulateurActions',

	// Components
    // explorer
  	explorer: 'src/clientcomponents/Explorer',
    // Simulateur
  	simulateur: 'src/clientcomponents/Simulateur',
    //FAQ
	faq: 'src/clientcomponents/Faq',
	aboutUs: 'src/clientcomponents/AboutUs',
	aboutEmprunteur: 'src/clientcomponents/AboutEmprunteur',
	aboutPreteur: 'src/clientcomponents/AboutPreteur',
	ourService: 'src/clientcomponents/OurService',
	newsletter: 'src/clientcomponents/Newsletter',
	contact: 'src/clientcomponents/Contact',
	fieldGroup: 'src/clientcomponents/FieldGroup',
	noMatch: 'src/clientcomponents/NoMatch',
	layout: 'src/clientcomponents/Layout',
	homePage: 'src/clientcomponents/HomePage',
	footer: 'src/clientcomponents/Footer',
	slider: 'src/clientcomponents/Slider',

	// Constants
	actionTypes: 'src/clientconstants/ActionTypes',
	simulateurConstants: 'src/clientconstants/SimulateurConstants',
	webServiceConstants: 'src/clientconstants/WebServiceConstants',

	// Services
	authService: 'src/clientservices/AuthService',
	simulateurService: 'src/clientservices/SimulateurService',

	// Stores
	baseStore: 'src/clientstores/BaseStore',
	simulateurStore: 'src/clientstores/SimulateurStore'
};
