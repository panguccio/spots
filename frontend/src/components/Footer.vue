<template>
    <footer class="footer">
        <div class="footer-content">
        <p>© 2026 Spots. All rights reserved.</p>
        <aside>A bunch of LLMs were <em>enslaved</em> for the realization of this project.</aside>
        </div>
    </footer>
</template>

<script setup>
</script>   

<style scoped>
.footer {
    width: 100%;
    background-color: #1e3c2f;
    color: white;
    padding: 20px 0;
    text-align: center;
    box-shadow: 0 -2px 4px rgba(0,0,0,.1);
    max-height: 62px;
    bottom: 0;
}
.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

aside {
    font-size: 12px;
    color:#1e3c2f;
}

aside:hover {
    color: #c2993e;
}
</style>