    var cookiesTotal = 0;
    var cookiesPPS = 0;

    setInterval(always, 10);
        function always(){

            cookiesTotal = cookiesTotal + (cookiesPPS/100);
            $('#counter > span').text(Math.round(cookiesTotal)); 
            $('#speed > span').text(cookiesPPS);

            $('.producer').each(function(index) {
                var element = $(this);
                var price = element.data('price')
                var amount = element.data('amount');
                element.children('.price').text(price);
                element.children('.amount').text(amount);
                
                if(cookiesTotal >= price) {
                    element.addClass('available');
                }
                else {
                    element.removeClass('available');
                }
            });
        };
    
    $('#cookie').click(function(){
        cookiesTotal = cookiesTotal + 1;
        $('#counter > span').text(Math.round(cookiesTotal));
    });

    $('.producer').click(function(){
        if ($(this).hasClass('available')) {
            var element = $(this);
            var price = element.data('price'); 
            cookiesTotal = cookiesTotal - price;
            price = Math.round(price * 1.15);
            element.data('price', price); 
            element.children('.price').text(price); 
            var amount = element.data('amount'); 
            amount = amount + 1;
            element.data('amount', amount); 
            element.children('.amount').text(amount); 
            var pps = element.data('pps'); 
            cookiesPPS = Math.round((cookiesPPS + pps)*100)/100;    
        };
    });

// -------------- BAZA DANYCH -------------//

    idb_request = window.indexedDB.open("indexed-db", 1);
    idb_request.addEventListener("error", function(event) { 
        alert("Nie otwarto IndexedDB ze względu na błąd: " + this.errorCode);
    });

        
    idb_request.addEventListener("upgradeneeded", function(event) {
            var storage = this.result.createObjectStore("data", { autoIncrement: true });
          
            storage.add({ 
                cookiesAmount: 0,   
                cookiesSpeed: 0,    
                cursorAmount: 0,    
                cursorPrice: 15,    
                grandmaAmount: 0,   
                grandmaPrice: 100,  
                farmAmount: 0,      
                farmPrice: 1100,    
                bakeryAmount: 0,    
                bakeryPrice: 12000, 
                mineAmount: 0,      
                minePrice: 130000   
            }, "save-data");
    });
        
    idb_request.addEventListener("success", function(event) {
        database = this.result;
          
        var storage = database.transaction("data", "readwrite").objectStore("data");
        storage.get("save-data").addEventListener("success", function(event) {
              
            if (this.result) { 

                cookiesTotal =  this.result.cookiesAmount;
                cookiesPPS = this.result.cookiesSpeed;
                $('#mouse').data('amount', this.result.cursorAmount);
                $('#mouse').data('price', this.result.cursorPrice);
                $('#grandma').data('amount', this.result.grandmaAmount);
                $('#grandma').data('price', this.result.grandmaPrice);
                $('#farm').data('amount', this.result.farmAmount);
                $('#farm').data('price', this.result.farmPrice);
                $('#bakery').data('amount', this.result.bakeryAmount);
                $('#bakery').data('price', this.result.bakeryPrice);
                $('#mine').data('amount', this.result.mineAmount);
                $('#mine').data('price', this.result.minePrice);
            
                storage.put(this.result, "save-data");
            }
        });
    }); 

    $('#saveButton').click(function(){
        if (database) {
            var storage = database.transaction("data", "readwrite").objectStore("data");
            
            storage.get("save-data").addEventListener("success", function(event) {

                this.result.cookiesAmount = cookiesTotal;
                this.result.cookiesSpeed = cookiesPPS;
                this.result.cursorAmount = $('#mouse').data('amount');
                this.result.cursorPrice = $('#mouse').data('price');
                this.result.grandmaAmount = $('#grandma').data('amount');
                this.result.grandmaPrice = $('#grandma').data('price');
                this.result.farmAmount = $('#farm').data('amount');
                this.result.farmPrice = $('#farm').data('price');
                this.result.bakeryAmount = $('#bakery').data('amount');
                this.result.bakeryPrice = $('#bakery').data('price');
                this.result.mineAmount = $('#mine').data('amount');
                this.result.minePrice = $('#mine').data('price');

                storage.put(this.result, "save-data");
            });
        } 
        
    });
    
    $('#removeDatabase').click(function(){
        if (database) { 
            window.indexedDB.deleteDatabase("indexed-db"); 
            database = undefined;

            cookiesTotal = 0;
            cookiesPPS = 0;
            $('#mouse').data('amount', 0);
            $('#mouse').data('price', 15);
            $('#grandma').data('amount', 0);
            $('#grandma').data('price', 100);
            $('#farm').data('amount', 0);
            $('#farm').data('price', 1100);
            $('#bakery').data('amount', 0);
            $('#bakery').data('price', 12000);
            $('#mine').data('amount', 0);
            $('#mine').data('price', 130000);
            
            return; 
        }   
    });