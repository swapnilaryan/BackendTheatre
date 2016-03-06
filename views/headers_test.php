<!-- Header -->
<div id="header">
    <h1 style="font-family:Algerian;font-weight: bold; color:#CC0000">Movie Theatre </h1>
    <!-- Sub-menu -->
    <div id="sub-navigation">
        <ul>
            <li><a href="#">HOME</a></li>
            <li><a href="#">NOW SHOWING</a></li>
            <li><a href="#">TOP RATED</a></li>
            <li><a href="#">MOST COMMENTED</a></li>
            <div id="search">
                <form class="input-group" method="get" action="/views/search_results.php" role="search">
                    <input type="text" class="form-control" placeholder="Search movies here" name="srch-term" id="srch-term">
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                    </div>
                </form>
            </div>
        </ul>
    </div>
    <!-- end Sub-Menu -->
</div>
<!-- end Header -->