package net.ddhome.ui.main.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * @author devadyuti das
 */
@Controller
@SessionAttributes({"local-country-code", "local-country", "local-language-code"})
public class DDHomeMainUIController {
    private static Logger log = LogManager.getLogger(DDHomeMainUIController.class);

    @RequestMapping(value = {"/"})
    public String main(ModelMap model, HttpServletRequest request) {
        final String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        model.addAttribute("url", baseUrl);
        Locale locale = LocaleContextHolder.getLocale();
        model.put("local-country-code", locale.getCountry().toUpperCase());
        model.put("local-country", locale.getDisplayCountry());
        model.put("local-language-code", locale.getLanguage().toUpperCase());
        log.info("Local Country and Language " + locale.getDisplayCountry() + "/" + locale.getDisplayLanguage());
        //log.info("DUMMY_FLAG = " + Boolean.getBoolean("DUMMY_FLAG"));

        /* Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            log.info("Cookies " + Arrays.stream(cookies)
                    .map(c -> c.getName() + "=" + c.getValue()).collect(Collectors.joining(", ")));
        } */

        return "index";
    }

    @RequestMapping({"/unreachable-page"})
    public RedirectView redirectWithUsingRedirectView() {
        return new RedirectView("error");
    }

    @RequestMapping(value = "/test")
    public String test(ModelMap model) {
        return "test";
    }
}
