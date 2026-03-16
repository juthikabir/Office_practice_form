function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}


loadCSS('https://cdn.datatables.net/buttons/3.1.2/css/buttons.dataTables.css');

loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', function() {
    loadScript('https://cdn.datatables.net/buttons/3.1.2/js/dataTables.buttons.js', function() {
        loadScript('https://cdn.datatables.net/buttons/3.1.2/js/buttons.html5.js', function() {

            new DataTable('#example', {
                ordering: false,
                dom: '<"d-flex justify-content-between align-items-center"iB>tp',
                infoCallback: function(settings, start, end, max, total, pre) {
                    return total + ' entries';
                },
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Excel',
                        filename: 'table_data'
                    }
                ]
            });

            // Add column borders via JS
            document.querySelectorAll('#example th, #example td').forEach(cell => {
                cell.style.borderLeft = '1px solid #dee2e6';
                cell.style.borderRight = '1px solid #dee2e6';

            // Add top border before the header
            document.querySelector('#example thead tr').style.borderTop = '1px solid #dee2e6';
                
            // Round border around table only
            const tableEl = document.getElementById('example');
            tableEl.style.borderRadius = '12px';
            tableEl.style.overflow = 'hidden';
            tableEl.style.boxShadow = '0 0 0 1px #dee2e6';

            // Outer wrapper spacing only
            const wrapper = document.getElementById('example_wrapper');
            wrapper.style.padding = '16px';
            wrapper.style.margin = '0 20px';
           });
        });
    });
});