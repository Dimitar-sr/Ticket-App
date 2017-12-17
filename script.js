// listen for the form submit
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    // get form values
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
    
    if(!validateForm(issueDesc, issueAssignedTo)) {
        return false;
    }
    
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };
    
    // test if issues are null
    if(localStorage.getItem('issues') === null) {
        // init array
        var issues = [];
        // add to array
        issues.push(issue);
        // set to local storage
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        // get issues from local storage
        var issues = JSON.parse(localStorage.getItem('issues'));
        // add issues to array
        issues.push(issue);
        // re-set it back to local storage
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    // re-fetch issues
    fetchIssues();
    
    // clear form 
    document.getElementById('issueInputForm').reset();
    
    // prevent form from submitting
    e.preventDefault();
    
}

// change the status of the ticket to closed
function setStatusClosed(id) {
    // get issues from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    // loop through issues and set to closed
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    // re-set it back to local storage
    localStorage.setItem('issues', JSON.stringify(issues));
    
    // display the issues 
    fetchIssues();
}

// delete the ticket
function deleteIssue(id) {
    // get issues from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    // loop through the issues and delete 
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    
    // re-set it back to local storage
    localStorage.setItem('issues', JSON.stringify(issues));
    
    // display the issues
    fetchIssues();
}

// display the issues on frontend (used bootstrap 3.3.7)
function fetchIssues() {
    
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListe = document.getElementById('issuesList');
    
    issuesListe.innerHTML = '';
    
    // loop through the issues 
    for(var i = 0; i < issues.length; i++) {
        
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
         // display them with bootstrap classes
        issuesListe.innerHTML += '<div class="bg-light text-dark">'+
    '<h6>Issue ID: ' + id + '</h6>'+
    '<p><span class="label label-info">' + status + '</span></p>'+
    '<h3>' + desc + '</h3>'+
    '<p><span class="glyphicon glyphicon-time">&nbsp;</span>' + severity + '</p>'+
    '<p><span class="glyphicon glyphicon-user">&nbsp;</span>' + assignedTo + '</p>'+
    '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
    '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
            '</div><br>';
        
    }
} 

// check to see if some fields are empty
function validateForm(issueDesc, issueAssignedTo) {
     if(!issueDesc|| !issueAssignedTo) {
        alert('Please fill in the form.');
        return false;
    }
    return true;
}