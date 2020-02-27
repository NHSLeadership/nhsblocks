<?php
	$namespace = 'nhsblocks/contentslistpage/';

	$titles = get_query_var( $namespace . 'h2titles' );
	$content = get_query_var( $namespace . 'content' );
	$classname = get_query_var( $namespace . 'class' );
if ( !empty( $titles ) ) {
	?>

    <nav class="nhsuk-contents-list" role="navigation" aria-label="Headings on this page">
        <h2 class="nhsuk-u-visually-hidden">Contents</h2>
        <ol class="nhsuk-contents-list__list">

			<?php foreach ( $titles as $key => $title ): ?>

                <li class="nhsuk-contents-list__item">
                    <a class="nhsuk-contents-list__link js-scroll-to" href="#<?php echo $title[ 'url' ]; ?>"><?php echo $title[ 'text' ]; ?></a>
                </li>

			<?php endforeach; ?>
        </ol>
    </nav>
	<?php
}
