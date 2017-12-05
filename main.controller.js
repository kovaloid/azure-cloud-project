angular
    .module('Main')
	.controller('MainController', ['$sce', '$scope', '$interpolate',
	    function MainController($sce, $scope, $interpolate) {
			var vm = this,
			    doc = new jsPDF();

			vm.pdfFileName = 'a4.pdf';
			
			vm.download = function () {
                doc.save(vm.pdfFileName);
			};
			
			vm.clear = function () {
				doc = new jsPDF();
				refreshPdfViewer();
			};
			
			vm.getPdfMarkup = function () {
				return doc.output();
			};
			
			vm.getEncryptedPdfMarkup = function () {
				return btoa(vm.getPdfMarkup());
			};
			
			vm.textLeftPadding = 10;
			vm.textTopPadding = 10;
			vm.textData = '';
			vm.fontList = doc.getFontList();
			vm.fontName = '';
			vm.fontStyle = '';
			vm.fontStyleList = [];
			//vm.fontSize = 10;
			//vm.textColor = 000000;
			
			vm.onChangeFontName = function () {
				vm.fontStyleList = vm.fontList[vm.fontName];
				doc.setFont(vm.fontName);
			};
			
			vm.onChangeFontStyle = function () {
				doc.setFontStyle(vm.fontStyle);
			};
			
			vm.addTextLine = function () {
				doc.text(vm.textData, vm.textLeftPadding, vm.textTopPadding);
				refreshPdfViewer();
			};
			
			
			vm.circleX = '';
			vm.circleY = '';
			vm.circleR = '';
			vm.circleStyle = '';
			vm.addCircle = function () {
				doc.circle(vm.circleX, vm.circleY, vm.circleR, vm.circleStyle);
				refreshPdfViewer();
			};
			
			vm.viewerWidth = 450;
			vm.viewerHeight = 550;
			
			function refreshPdfViewer() {
				vm.encryptedPdfUrl = $sce.trustAsResourceUrl('data:application/pdf;base64,' + vm.getEncryptedPdfMarkup());
			    vm.embedPdfBox = $sce.trustAsHtml($interpolate('<embed width="{{vm.viewerWidth}}" height="{{vm.viewerHeight}}" type="application/pdf" src="{{vm.encryptedPdfUrl}}"></embed>')($scope));
			}
		
        }]);