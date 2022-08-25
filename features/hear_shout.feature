Feature: Hear shout

   Shouty allows users to hear shouts from other users as long as they are in range.

   Rule: Shouts can be heard by everyone within range.

      Scenario: Listener is within range
         Given Lucy is located 15 meters away from Sean
         When Sean shouts "Hello"
         Then Lucy hears Sean's Shout
