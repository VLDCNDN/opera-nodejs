This is based in Oracle Hospitality OPERA Web Self-Service

Please Refer to this [link](https://docs.oracle.com/cd/E90572_01/index.html) to get the idea

# To Use
- after cloning
- copy .env.copy and rename it to .env
- add required fields
  - Note: Follow the <a href="#credential">Credential</a></td> what you need to input in .env
- check the file in test folder or you can create your own
- try running `mocha`


# Functions
List of Function you can use
<table>
    <thead>
        <tr>
            <th>Classes</th>
            <th>Methods</th>
            <th>Params</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2>FetchBookingRequest</td>
            <td>byConfirmationNumber</td>
            <td>- <b>confirmationNumber</b> : String<b><br>- config:</b> <a href="#credential">Credential</a></td>
        </tr>
        <tr>
            <td>byReservationId</td>
             <td>- <b>reservationId</b> : String<b><br>- config:</b> <a href="#credential">Credential</a></td>
        </tr>
        <tr>
            <td rowspan=1>FutureBookingSummaryRequest</td>
            <td>byRoomNumberAndInhouse</td>
            <td>- <b>roomNumber</b> : String<b><br>- config:</b> <a href="#credential">Credential</a></td>
        </tr>
        <tr>
            <td rowspan=1>FetchRoomStatusRequest</td>
            <td>byRoomNumber</td>
           <td>- <b>roomNumber</b> : String<b><br>- config:</b> <a href="#credential">Credential</a></td>
        </tr>
        <tr>
            <td rowspan=1>AssignRoomAdvRequest</td>
            <td>byRoomNumberAndReservationId</td>
           <td>- <b>reservationId</b> : String<b><br>- <b>roomNumber</b> : String<b><br>- config:</b> <a href="#credential">Credential</a></td>
        </tr>
        <tr>
            <td rowspan=1>PostChargeRequest</td>
            <td>byReservationId</td>
            <td>{- <b>reservationId</b> : String<br>
            - <b>shortInfo</b>: String <br>
            - <b>longInfo</b>: String <br>
            - <b>charge</b>: Number  <br>
            - account: String (Optional) <br>
            - userId: String (Optional) <br>
            - stationID: String (Optional) <br>
            } <br>
            - <b>config:</b> <a href="#credential">Credential</a><br><br>
             <b><em>Note</em></b>: the reservationID to stationID is destructured
            </td>
        </tr>
    </tbody>
</table>

### <a name="credential">Credential</a>
This must be passdown as an object
<table>
  <thead>
   <tr>
        <th>Fields</th>
        <th>Type</th>
        <th>is Required in Cloud</th>
        <th>is Required in Local</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>url</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>propertyCode</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>chainCode</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:x:</td>
    </tr>
    <tr>
      <td>wsseUsername</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:x:</td>
    </tr>
    <tr>
      <td>wssePassword</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:x:</td>
    </tr>
    <tr>
      <td>username</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:heavy_check_mark:</td>
    </tr>
    <tr>
      <td>password</td>
      <td>String</td>
      <td>:heavy_check_mark:</td>
      <td>:heavy_check_mark:</td>
    </tr>
  </tbody>
</table>


