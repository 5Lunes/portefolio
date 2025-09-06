const lngs = {
  en: { nativeName: '🇬🇧 English' },
  fr: { nativeName: '🇧🇪 Français' }
};


const rerender = () => {

  // start localizing, details:
  // https://github.com/i18next/jquery-i18next#usage-of-selector-function

  $('body').localize();


}


$(function () {

  // use plugins and options as needed, for options, detail see
  // https://www.i18next.com

  i18next

    //.use(i18nextBrowserLanguageDetector)
    .use(i18nextHttpBackend)

    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options

    .init({

      debug: true,
      fallbackLng: 'fr',
      backend: {
        loadPath: 'js/translation/locales/{{lng}}/{{ns}}.json'
      },

    }, (err, t) => {

      if (err) return console.error(err);

      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin

      jqueryI18next.init(i18next, $, { useOptionsAttr: true });

      // start localizing, details:
      // https://github.com/i18next/jquery-i18next#usage-of-selector-function

      Object.keys(lngs).map((lng) => {

        const opt = new Option(lngs[lng].nativeName, lng);

        if (lng === i18next.resolvedLanguage) {

          opt.setAttribute("selected", "selected");
        }
        $('#languageSwitcher').append(opt);
      });
      $('#languageSwitcher').change((a, b, c) => {

        const chosenLng = $(this).find("option:selected").attr('value');

        i18next.changeLanguage(chosenLng, () => {
          rerender();
        });

      });
      
      rerender();

    });

});

