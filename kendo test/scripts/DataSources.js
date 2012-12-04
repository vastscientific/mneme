var DSProjects = new kendo.data.DataSource({
	//type: "odata",
	transport: {
		read: {
			url:"http://qaqc.vastsci.com/visualize/Q2JSON.aspx?Q=SELECT%20ProjectID,Name,CreatedBy,CreatedOn%20FROM%20rawmeat.projects;",
			dataType: "json"
		}
	}
});