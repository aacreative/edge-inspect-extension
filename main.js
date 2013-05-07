/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, Mustache */

define(function (require, exports, module) {
    "use strict";
    
    // Modules
    var inspect                 = require("inspect"),
        inspectToolbarHtml      = require("text!htmlContent/inspect-toolbar.html"),
        Strings                 = require("strings");

    var AppInit                 = brackets.getModule("utils/AppInit"),
        ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
        CommandManager          = brackets.getModule("command/CommandManager");
    
    // DOM elements and HTML
    var $toolbarIcon = null;
    
    // Commands & Prefs Strings
    var COMMAND_HANDLE_INSPECT_CONTROLS = "edgeinspect.handleinspectcontrols";
    
    function handleToolbarClick() {
        CommandManager.execute(COMMAND_HANDLE_INSPECT_CONTROLS);
    }

    function initToolbar() {
        // register commands
        CommandManager.register(Strings.GENERATE_INSPECT_CONTROLS,
                                COMMAND_HANDLE_INSPECT_CONTROLS,
                                inspect.handleInspectControls);

        // set up toolbar icon
        $toolbarIcon = $(Mustache.render(inspectToolbarHtml, Strings));
        $toolbarIcon.insertAfter("#toolbar-go-live");
        $toolbarIcon.on("click", handleToolbarClick);
    }
    
    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "styles/inspect.css");
        
        inspect.init()
            .done(initToolbar)
            .fail(function (err) {
                console.log("Inspect initialization failed: " + err);
            });
    });
});
