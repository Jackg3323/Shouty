Feature: Hear shout

   Shouty allows users to hear shouts from other users as long as they are in range.

   Rule: Shouts can be heard by everyone within range.

      Scenario: Listener is within range
         # Given Lucy is located 15 meters away from Sean
         Given the range is 100
         And Sean is located at 0
         And Lucy is located at 50
         When Sean shouts "Hello"
         Then Lucy hears Sean's Shout

      Scenario: Listener is out of range
         Given the range is 100
         And Sean is located at 0
         And Lucy is located at 110
         When Sean shouts "Hello"
         Then Lucy does not hear Sean's Shout

      # Scenario: There are 2 listeners within range
      #    Given the range is 100
      #    And Sean is located at 0
      #    And Lucy is located at 50
      #    And Lauren is located at 25
      #    When Sean shouts "Hello"
      #    Then Lucy and Lauren hear Sean's Shout

   # Rule: Shouts should only be heard after the shout is sent

   #    Scenario: The shouter does not send the shout
   #       Given the range is 100
   #       And Sean is located at 0
   #       And Lucy is located at 50
   #       When Sean does not send the shout "Hello"
   #       Then Lucy does not hear Sean's Shout


   Rule: Shouts should only be 140 characters long

      # Scenario: The shouter uses 145 charcaters
      #    Given the max character length is 140
      #    Given the range is 100
      #    And Sean is located at 0
      #    And Lucy is located at 50
      #    When Sean tries to send a shout with 145 characters
      #    Then Lucy does not hear Sean's Shout

         Scenario: Message is too long
            Given the maximum character length is 140
            And the range is 100
            And Sean is located at 0
            And Lucy is located at 50
            When Sean shouts,
            """
            This is a really long message
            so long in fact that I am not going to
            be allowed to send it, at least if I keep
            typing like this until the length is over
            the limit of 180 characters.
            """
            Then Lucy does not hear Sean's Shout
            And an error message is displayed that states "Message is too long"