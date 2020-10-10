package net.ddhome.ui.main.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * @author devadyuti das
 */
@Controller
@SessionAttributes({"local-country-code", "local-country", "local-language-code"})
public class DDHomeErrorUIController implements ErrorController {
    private static Logger log = LogManager.getLogger(DDHomeErrorUIController.class);

    @RequestMapping("/error")
    public String handleError(ModelMap model, HttpServletRequest request) {
        Locale locale = LocaleContextHolder.getLocale();
        model.put("local-country-code", locale.getCountry().toUpperCase());
        model.put("local-country", locale.getDisplayCountry());
        model.put("local-language-code", locale.getLanguage().toUpperCase());
        log.info("Local Country and Language " + locale.getDisplayCountry() + "/" + locale.getDisplayLanguage());
        log.error("Error in Accessing Page for " + request.getRequestedSessionId() + " from " + request.getRemoteAddr());
        return "error";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
