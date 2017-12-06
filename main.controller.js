angular
    .module('Main')
	.controller('MainController', ['$sce', '$scope', '$interpolate', 'MainService',
	    function MainController($sce, $scope, $interpolate, MainService) {
			var vm = this,
			    doc = new jsPDF();

			vm.pageList = ['main', 'about', 'feedback'];
			vm.currentPage = vm.pageList[0];
			
			vm.aboutText = '';
			MainService.getAbout().then(function (response) {
				vm.aboutText = response.data;
			}, function (error) {
				console.log(error);
			});
			
			vm.feedbackData = {
				user: '',
				message: ''
			};
			vm.feedbackResponseText = '';
			vm.sendFeedback = function () {
				MainService.sendFeedback(vm.feedbackData).then(function (response) {
				    vm.feedbackResponseText = $sce.trustAsHtml(response.data);
			    }, function (error) {
				    console.log(error);
			    });
			};
			
			vm.colorList = [
			    {name: 'red', rgb: [255, 0, 0]},
				{name: 'green', rgb: [0, 255, 0]},
				{name: 'blue', rgb: [0, 0, 255]},
				{name: 'yellow', rgb: [255, 255, 0]},
				{name: 'pink', rgb: [255, 0, 255]},
				{name: 'cyan', rgb: [0, 255, 255]},
				{name: 'black', rgb: [0, 0, 0]}
			];
			
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
			vm.fontSize = '';
			vm.textColor = '';
			
			vm.onChangeFontName = function () {
				vm.fontStyleList = vm.fontList[vm.fontName];
				doc.setFont(vm.fontName);
			};
			
			vm.onChangeFontStyle = function () {
				doc.setFontStyle(vm.fontStyle);
			};
			
			vm.onChangeTextColor = function () {
				var rgb = vm.colorList.filter(function (color) {
                    return color.name === vm.textColor;
                })[0].rgb;
				doc.setTextColor(rgb[0], rgb[1], rgb[2]);
			};
			
			vm.addTextLine = function () {
				if (vm.fontSize) {
					doc.setFontSize(vm.fontSize);
				}
				doc.text(vm.textData, vm.textLeftPadding, vm.textTopPadding);
				refreshPdfViewer();
			};
			
			vm.lineX1 = 5;
			vm.lineY1 = 5;
			vm.lineX2 = 30;
			vm.lineY2 = 30;
			vm.addLine = function () {
				doc.line(vm.lineX1, vm.lineY1, vm.lineX2, vm.lineY2);
				refreshPdfViewer();
			};
			
			vm.lineWidthList = [0.1, 0.5, 1.0, 1.5, 2.0];
			vm.lineWidth = '';
			vm.onChangeLineWidth = function () {
				doc.setLineWidth(vm.lineWidth);
			};
			
			vm.drawColor = '';
			vm.onChangeDrawColor = function () {
				var rgb = vm.colorList.filter(function (color) {
                    return color.name === vm.drawColor;
                })[0].rgb;
				doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
			};
			
			vm.viewerHeight = '850';
			
			function refreshPdfViewer() {
				vm.encryptedPdfUrl = $sce.trustAsResourceUrl('data:application/pdf;base64,' + vm.getEncryptedPdfMarkup());
			    vm.embedPdfBox = $sce.trustAsHtml($interpolate('<embed width="100%" height="{{vm.viewerHeight}}" type="application/pdf" src="{{vm.encryptedPdfUrl}}"></embed>')($scope));
			}
			refreshPdfViewer();
		
        }]);