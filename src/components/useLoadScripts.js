import { useEffect } from 'react';

function useLoadScripts() {
    useEffect(() => {
        // Carica jQuery
        const script = document.createElement('script');
        script.src = "https://app.huberway.org/assets/plugins/jquery/jquery-3.2.1.min.js?v=" + Date.now();
        script.onload = () => {
            // Carica gli altri script dopo jQuery
            loadScriptsSequentially([
                "https://app.huberway.org/assets/plugins/pace/pace.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/liga.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/modernizr.custom.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-ui/jquery-ui.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/popper/umd/popper.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/bootstrap/js/bootstrap.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery/jquery-easy.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-unveil/jquery.unveil.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-ios-list/jquery.ioslist.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-actual/jquery.actual.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js",
                "https://app.huberway.org/assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js",
                "https://app.huberway.org/assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js",
                "https://app.huberway.org/assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js",
                "https://app.huberway.org/assets/plugins/datatables-responsive/js/datatables.responsive.js",
                "https://app.huberway.org/assets/plugins/select2/js/select2.full.min.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/classie/classie.js?v=" + Date.now(),
                "https://app.huberway.org/assets/plugins/jquery-validation/js/jquery.validate.min.js?v=" + Date.now(),
                "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.js?v=" + Date.now(),
            ]);
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup: rimuovi gli script aggiunti quando il componente si smonta
            document.body.removeChild(script);
        };
    }, []);

    const loadScriptsSequentially = (scripts) => {
        if (scripts.length === 0) return;
        const script = document.createElement('script');
        script.src = scripts[0];
        script.onload = () => loadScriptsSequentially(scripts.slice(1));
        document.body.appendChild(script);
    };
}

export default useLoadScripts;
