module.exports = {
	 title: 'SPYC S2 English Language',
	 description: 'Your E-Textbook',
	 themeConfig: {
		 nav: [
		 { text: 'Home', link:'/' },
		 { text: 'Tutorial', link:'/tutorial/' },
		 { text: 'Pastpaper', link:'https://www2.pyc.edu.hk/index.php' },
	 	],
	 	sidebar: {
			'/tutorial/': [
				'',
				'pastPerfect',
				'relativeClause',
				'reportedSpeech',
				'participleAdj',
				'tofin&ger',
				'questionTag',
				'conditionals',
			],
			'/langaw/': [
				'',
				'street',
			]
		}
	}
}
