<?php
session_start();
include 'headers.php';
?>
<head>
    <script src="/js/movie_screen_timings.js"></script>
</head>
<html>
<body>
<h3 align="center"> Movie Screen Timings </h3>
<hr>
<div class="container-fluid">
    <script>
        $(function() {
            $('input[name=dob]').datepicker();
        });
    </script>

    <div class="row clearfix">
        <div class="col-md-12 col-xs-12 col-lg-12 col-sm-12">
            <form method="POST" action='' name="frmAddProd">
                <table class="table table-bordered table-hover" id="tab_logic">
                    <thead>
                    <tr >
                        <th class="text-center">
                            Id
                        </th>
                        <th class="text-center">
                            Movie
                        </th>
                        <th class="text-center">
                            Start Time
                        </th>
                        <th class="text-center">
                            End Time
                        </th>
                        <th class="text-center">
                            Screen No.
                        </th>
                        <th class="text-center">
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr id='addr0'>
                        <td>
                            1
                        </td>
                        <td>
                            <input type="text" name='movie'  placeholder='Movie' class="form-control"/>
                        </td>
                        <td>
                            <input type="text" name='StartTime' placeholder='Start Time' class="form-control"/>
                        </td>
                        <td>
                            <input type="text" name='EndTime' placeholder='End Time' class="form-control"/>
                        </td>
                        <td>
                            <input type="text" name='ScreenNo' placeholder='Screen No.' class="form-control"/>
                        </td>
                        <td>
                            <input type="text" name='Date' placeholder='Date' class="form-control"/>
                        </td>
                    </tr>
                    <tr id='addr1'></tr>
                    </tbody>
                </table>
                </form>
        </div>
    </div>
    <a id="add_row" class="btn btn-default pull-left">Add Row</a><a id='delete_row' class="pull-right btn btn-default">Delete Row</a>
</div><input
    type="submit" value="Submit" />
</body>
</html>
<?php
include "footers.php";
?>
