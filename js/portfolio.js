(function() {
  $.easing.def = 'easeInOutExpo'

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
    openProject.css({height: 'auto'})
    
    openProject.find('.proj-details').hide()
  }

  var openProject = function(closedProject, projectOpen) {
    closedProject.find('.proj-details').show()

    $('body').animate({
      scrollTop: closedProject.offset().top-.05*$(window).height()
    }, 200);

    closedProject.addClass('open')
    closedProject.css({height: .9*$(window).height()})

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
