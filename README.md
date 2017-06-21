# Kumquat Timer

### Milestones
- [x] Show an alert after one minute.
- [x] Show an alert after a given time.
- [x] Save an instance of a timer. 
- [x] Save timers to LocalStorage.
- [x] Print localStorage timers to the DOM.
- [x] Add modal.
- [x] Show clock counting down the seconds.
- [x] Allow user to set a temporary focus.
- [kindof] Disallow multiple timers to run simultaneously.
- [] Allow user to name the timer.
- [x] Show timer on creation.
- [] Stylin': mobile first and responsive
    - [x] landing page timer list
    - [x] modal
- [x] Add empty state

- [] Deal with edgecases:
    - [x] 00:00 timer
    - [] over 60:00 timer ? or over 100:00 timer

### Stretch Goals
- As a developer I want to use [EasyTimer.js](http://albert-gonzalez.github.io/easytimer.js/) library to do the countdown work.
- As a user I want to delete a singular timer.
- As a user I want to hear a sound when the timer is complete.
- As a user I want to see the time remaining in the browser tab.
- As a developer I want to check the remaining time against a Date object rather than using setInterval to change runTime for more accuracy.
- As a developer I want to add an easter egg: when a user clicks the emoji in the header, something random should happen.
- As a user I want the clocks to account for hours (1:00:00).

### User Stories
- As a user I want to create a timer of a certain length. 
- As a user I want to start a timer and see it countdown the time.
- As a user I want to be able to cancel a timer.
- As a user I want to be able to see all the timers I've saved.
- As a user I want to name my timer.
- As a user I want to be notified in some way when the timer is done.