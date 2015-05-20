(function() {
  var theOpenProject = function() {
    return $('.open')
  }

  var isOpenProject = function() {
    return theOpenProject().length > 0
  }

  $('.proj').click(function() {
    handleProjectClick($(this).attr('id'))
  });

  var closeProject = function(openProject, newProject) {
    openProject.removeClass('open')
    
    openProject.find('.proj-details').hide()

    openProject.removeClass('active')
  }

  var openProject = function(closedProject, projectOpen) {
    closedProject.addClass('active')

    closedProject.find('.proj-details').show()

    $('body').scrollTop(closedProject.offset().top)

    closedProject.addClass('open')
    if (!window.location.hash)
      window.history.pushState('open', '', window.location.href+'#'+closedProject.attr('id'))
  }

  // focusing targeted project
  if (window.location.hash)
    openProject($(window.location.hash), false)

  window.onpopstate = function(e) {
    if (window.location.hash) {
      handleProjectClick(window.location.hash.substring(1))
      return
    }
    if (isOpenProject())
      handleProjectClick(theOpenProject().attr('id'))
  }

  function handleProjectClick(entry) {
    var thisProject = $('#'+entry)
    var selfWasOpen = $(thisProject).hasClass('open')

    // close any open projects (there should only be one)
    if (isOpenProject())
      closeProject(theOpenProject(), $(thisProject))

    if (selfWasOpen) return

    openProject($(thisProject), isOpenProject()? true : false) 
  }
})()
