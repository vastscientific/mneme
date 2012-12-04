// Global state
            var plotSelectName = "";
            var selectedProjectID=0;

// Data Sources
			var DSProjects = new kendo.data.DataSource({
				transport: {
					read: {
						url:"http://qaqc.vastsci.com/visualize/Q2JSON.aspx?Q=SELECT%20ProjectID,Name,CreatedBy,CreatedOn%20FROM%20rawmeat.projects;",
						dataType: "json"
					}
				}
			});
			var splitViewCategories = new kendo.data.DataSource({
				transport: {
					read: {
						url:"http://qaqc.vastsci.com/visualize/Q2JSON.aspx?Q=SELECT%20labid%20as%20CategoryID,name%20as%20CategoryName%20FROM%20rawmeat.projects%20group%20by%20categoryid",
						dataType: "json"
					}
				}
			});
			
			var splitViewProducts = new kendo.data.DataSource({
				type: "odata",
				serverFiltering: true,
			
				transport: {
					read: {
						url: "http://demos.kendoui.com/service/Northwind.svc/Products"
					}
				}
			});	
			
			var splitViewOrderDetails = new kendo.data.DataSource({
				type: "odata",
				serverFiltering: true,
				transport: {
					read: {
						url: "http://demos.kendoui.com/service/Northwind.svc/Order_Details?$expand=Order"
					}
				},
			
				change: function() {
					var template = kendo.template($("#ordersTemplate").text());
					$("#product-details").html(kendo.render(template, this.data()));
				}
			});
			
			function displayOrder(e) {
				splitViewOrderDetails.filter({
					field: "ProductID",
					operator: "eq",
					value: parseInt(e.view.params.ProductID)
				});

				splitViewOrderDetails.read();
			}
			
			function filterProducts(e) {
				splitViewProducts.filter({
					field: "CategoryID",
					operator: "eq",
					value: parseInt(e.view.params.CategoryID)
				});

				splitViewProducts.read();
			}
			
			function toggleBackButton(e) {
				if (e.view.id === "#side-Main") {
					e.view.element
					.find("[data-role=backbutton]")
					.css("visibility", "")
					.attr("data-target", "_top");
				}
				else {
					e.view.element
					.find("[data-role=backbutton]")
					.css("visibility", "visible")
					.removeAttr("data-target");
				}
			}

// plot selection
        var openWindow = function(){
            var window = $("#window");

            var onClose = function() {

            }
            if(!window.data("kendoWindow")){
                    window.kendoWindow({
                           // width: "400px",
                            title: "Select Plot Type",
                            modal: true,
                            close: onClose,
                            content: "Views/PlotSelect.html"
                        }); 
                }
            window.data("kendoWindow").center();
            window.data("kendoWindow").open().center();
            $("plotSelectButton").text="Plot Selected "+plotSelectName;
        }
        
        var plotSelect = function(title, name){
            plotSelectName = name;
            $("#plotSelectButton").text("Plot type: "+title);
            $("#window").data("kendoWindow").close();

        }
