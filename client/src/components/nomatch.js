//*******************************************************************************/
//  This function provides a message that there is no match for the car search  */
//*******************************************************************************/
import React from "react";

function NoMatch() {
  return (
    <container fluid>
      <row>
        <col size="md-12">
          <jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </jumbotron>
        </col>
      </row>
    </container>
  );
}

export default NoMatch;
